// Builds src/data/map.json, the static map of Spain on the Miembros page: province outlines and the
// position of one bubble per province with members. Run with `npm run map` after editing
// src/data/members.ts (Node 23 or later, which imports the .ts file directly); the output is
// committed, so the site build does not run this.
// Outlines: es-atlas 0.6.0 (IGN, CC BY 4.0). Conic conformal projection; the Canaries go in an
// inset at the bottom right, at the same scale as the peninsula.
import { readFileSync, writeFileSync } from 'node:fs';
import { feature, mesh } from 'topojson-client';
import { presimplify, simplify } from 'topojson-simplify';
import { geoConicConformal, geoPath } from 'd3-geo';
import { members } from '../src/data/members.ts';

const W = 640, H = 520;

// Bubble position per province: the municipality where most of its members sit.
const anchors = {
  'A Coruña': [-8.5448, 42.8782],          // Santiago de Compostela
  'Alicante': [-0.4810, 38.3452],
  'Almería': [-2.4637, 36.8340],
  'Araba/Álava': [-2.6716, 42.8467],       // Vitoria-Gasteiz
  'Asturias': [-5.8494, 43.3614],          // Oviedo
  'Ávila': [-4.6818, 40.6565],
  'Badajoz': [-6.9707, 38.8794],
  'Barcelona': [2.1686, 41.3874],
  'Bizkaia': [-2.9350, 43.2630],           // Bilbao
  'Burgos': [-3.6969, 42.3439],
  'Castellón': [-0.0513, 39.9864],
  'Ciudad Real': [-3.9274, 38.9848],
  'Córdoba': [-4.7794, 37.8882],
  'Gipuzkoa': [-1.9812, 43.3183],          // Donostia / San Sebastián
  'Girona': [2.8214, 41.9794],
  'Illes Balears': [2.6502, 39.5696],      // Palma
  'Jaén': [-3.7849, 37.7796],
  'La Rioja': [-2.4450, 42.4627],          // Logroño
  'Lleida': [0.6200, 41.6176],
  'Madrid': [-3.7038, 40.4168],
  'Málaga': [-4.4214, 36.7213],
  'Murcia': [-1.1307, 37.9922],
  'Navarra': [-1.6458, 42.8125],           // Pamplona
  'Pontevedra': [-8.7207, 42.2406],        // Vigo
  'Salamanca': [-5.6635, 40.9701],
  'Santa Cruz de Tenerife': [-16.2518, 28.4636],
  'Sevilla': [-5.9845, 37.3891],
  'Tarragona': [1.2445, 41.1189],
  'Valencia': [-0.3763, 39.4699],
  'Valladolid': [-4.7245, 41.6523],
  'Zaragoza': [-0.8891, 41.6488],
};

const missing = [...new Set(members.map((m) => m.province))].filter((p) => !anchors[p]);
if (missing.length) throw new Error(`No anchor for province(s): ${missing.join(', ')}`);

// Simplified (Visvalingam, minimum triangle area) to keep the map light at this size.
const topo = simplify(presimplify(JSON.parse(readFileSync(new URL('../node_modules/es-atlas/es/provinces.json', import.meta.url)))), 3e-3);
const isCanary = (name) => name === 'Las Palmas' || name === 'Santa Cruz de Tenerife';
const keep = (g) => !g.properties.name.startsWith('Gibraltar');
const geoms = topo.objects.provinces.geometries.filter(keep);
const part = (canary) => ({ type: 'GeometryCollection', geometries: geoms.filter((g) => isCanary(g.properties.name) === canary) });
const main = feature(topo, part(false));
const canaries = feature(topo, part(true));

const pad = 8;
const peninsula = geoConicConformal().rotate([3.5, 0]).parallels([36, 43]).fitExtent([[pad, pad], [W - pad, H - pad]], main);
const canary = geoConicConformal().rotate([15.5, 0]).parallels([27.5, 29.5]).scale(peninsula.scale());
// Place the islands in the empty sea at the bottom right, with a frame around them.
canary.translate([0, 0]);
const [[x0, y0], [x1, y1]] = geoPath(canary).bounds(canaries);
const box = { x: W - pad - (x1 - x0) - 16, y: H - pad - (y1 - y0) - 16, w: (x1 - x0) + 16, h: (y1 - y0) + 16 };
canary.translate([box.x + 8 - x0, box.y + 8 - y0]);

const r = (n) => Math.round(n * 10) / 10;
const pathP = geoPath(peninsula).digits(1), pathC = geoPath(canary).digits(1);

const map = {
  width: W,
  height: H,
  fill: pathP(main) + pathC(canaries),
  provinces: pathP(mesh(topo, part(false), (a, b) => a !== b)) + pathC(mesh(topo, part(true), (a, b) => a !== b)),
  inset: { x: r(box.x), y: r(box.y), w: r(box.w), h: r(box.h) },
  anchors: Object.fromEntries(Object.entries(anchors).map(([k, ll]) => [k, (isCanary(k) ? canary : peninsula)(ll).map(r)])),
};

writeFileSync(new URL('../src/data/map.json', import.meta.url), JSON.stringify(map));
console.log(`map.json: ${Object.keys(map.anchors).length} anchors, ${(JSON.stringify(map).length / 1024).toFixed(0)} KB`);
