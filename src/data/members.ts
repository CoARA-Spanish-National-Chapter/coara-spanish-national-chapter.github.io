// Members of the Spanish National Chapter, from the Chapter's list "National Chapter Spain"
// (March 2026; file "2026.02.23 NCS Members.docx"). Names as in that list. The type and the
// municipality of each seat were added here; `province` places the organisation on the map
// (scripts/build-map.mjs). ACCUEE and SCIE seats checked on their websites, 2026-10-19.
export const membersAsOf = 'marzo de 2026';

export type MemberType = 'Universidad' | 'Agencia' | 'Centro de investigación' | 'Fundación, asociación o red';

export interface Member {
  name: string;
  type: MemberType;
  city: string;
  province: string;
  cochair?: boolean;
}

const U: MemberType = 'Universidad';
const A: MemberType = 'Agencia';
const C: MemberType = 'Centro de investigación';
const F: MemberType = 'Fundación, asociación o red';

export const members: Member[] = [
  // Co-chairs
  { name: 'National Agency for Quality Assessment and Accreditation of Spain (ANECA)', type: A, city: 'Madrid', province: 'Madrid', cochair: true },
  { name: 'Conference of Rectors of Spanish Universities (CRUE)', type: F, city: 'Madrid', province: 'Madrid', cochair: true },
  { name: 'Spanish National Research Council (CSIC)', type: C, city: 'Madrid', province: 'Madrid', cochair: true },
  { name: 'Carlos III Health Institute (ISCIII)', type: C, city: 'Madrid', province: 'Madrid', cochair: true },
  // Agencies, centres, foundations, associations
  { name: 'Agencia Estatal de Investigación (AEI)', type: A, city: 'Madrid', province: 'Madrid' },
  { name: 'Agencia para la Calidad Científica y Universitaria de Andalucía (ACCUA)', type: A, city: 'Córdoba', province: 'Córdoba' },
  { name: 'Agencia de Calidad y Prospectiva Universitaria de Aragón (ACPUA)', type: A, city: 'Zaragoza', province: 'Zaragoza' },
  { name: 'Agencia Canaria de Calidad Universitaria y Evaluación Educativa (ACCUEE)', type: A, city: 'Santa Cruz de Tenerife', province: 'Santa Cruz de Tenerife' },
  { name: 'Agencia de Calidad Universitaria de las Illes Balears', type: A, city: 'Palma', province: 'Illes Balears' },
  { name: 'Axencia para a Calidade do Sistema Universitario de Galicia (ACSUG)', type: A, city: 'Santiago de Compostela', province: 'A Coruña' },
  { name: 'Agencia para la Calidad del Sistema Universitario de Castilla y León (ACSUCyL)', type: A, city: 'Valladolid', province: 'Valladolid' },
  { name: 'Agència per a la Qualitat del Sistema Universitari de Catalunya (AQU Catalunya)', type: A, city: 'Barcelona', province: 'Barcelona' },
  { name: 'Agència de Qualitat i Avaluació Sanitàries de Catalunya (AQuAS)', type: A, city: 'Barcelona', province: 'Barcelona' },
  { name: 'Asociación de Mujeres Investigadoras y Tecnólogas (AMIT)', type: F, city: 'Madrid', province: 'Madrid' },
  { name: 'AVAP – Agencia Valenciana d’Avaluació i Prospectiva', type: A, city: 'Valencia', province: 'Valencia' },
  { name: 'BarcelonaBeta Brain Research Center (BBRC)', type: C, city: 'Barcelona', province: 'Barcelona' },
  { name: 'Centre de Recerca Matemàtica (CRM)', type: C, city: 'Cerdanyola del Vallès', province: 'Barcelona' },
  { name: 'Centre for Genomic Regulation (CRG)', type: C, city: 'Barcelona', province: 'Barcelona' },
  { name: 'Centro de Investigación Ecológica y Aplicaciones Forestales (CREAF)', type: C, city: 'Cerdanyola del Vallès', province: 'Barcelona' },
  { name: 'Centre de Ciència i Tecnologia Forestal de Catalunya (CTFC)', type: C, city: 'Solsona', province: 'Lleida' },
  { name: 'Confederación de Sociedades Científicas de España (COSCE)', type: F, city: 'Madrid', province: 'Madrid' },
  { name: 'EU-LIFE', type: F, city: 'Barcelona', province: 'Barcelona' },
  { name: 'Fundació Foment de la Investigació Sanitària i Biomèdica Comunitat Valenciana', type: C, city: 'Valencia', province: 'Valencia' },
  { name: 'Fundació Pasqual Maragall', type: F, city: 'Barcelona', province: 'Barcelona' },
  { name: 'Fundación Agencia Aragonesa para la Investigación y el Desarrollo (ARAID)', type: F, city: 'Zaragoza', province: 'Zaragoza' },
  { name: 'Fundación Española para la Ciencia y Tecnología (FECYT)', type: F, city: 'Alcobendas', province: 'Madrid' },
  { name: 'Fundación para el Conocimiento madri+d', type: A, city: 'Madrid', province: 'Madrid' },
  { name: 'Fundación para la Investigación Biomédica del Hospital Universitario La Paz', type: C, city: 'Madrid', province: 'Madrid' },
  { name: 'Fundación Universidad Católica de Valencia San Vicente Mártir', type: U, city: 'Valencia', province: 'Valencia' },
  { name: 'Fundación Universidad San Jorge', type: U, city: 'Villanueva de Gállego', province: 'Zaragoza' },
  { name: 'Institució CERCA', type: F, city: 'Barcelona', province: 'Barcelona' },
  { name: 'Institut Català de Nanociència i Nanotecnologia (ICN2)', type: C, city: 'Cerdanyola del Vallès', province: 'Barcelona' },
  { name: 'Institut d’Investigacions Biomèdiques August Pi i Sunyer (IDIBAPS)', type: C, city: 'Barcelona', province: 'Barcelona' },
  { name: 'Institut de Bioenginyeria de Catalunya', type: C, city: 'Barcelona', province: 'Barcelona' },
  { name: 'Institut de Recerca en Energia de Catalunya (IREC)', type: C, city: 'Sant Adrià de Besòs', province: 'Barcelona' },
  { name: 'Instituto de Investigación Sanitaria Biodonostia (IIS Biodonostia)', type: C, city: 'Donostia / San Sebastián', province: 'Gipuzkoa' },
  { name: 'IR Sant Pau – Institut de Recerca Sant Pau', type: C, city: 'Barcelona', province: 'Barcelona' },
  { name: 'ISGlobal – Barcelona Institute for Global Health', type: C, city: 'Barcelona', province: 'Barcelona' },
  { name: 'Red de Bibliotecas Universitarias Españolas (REBIUN)', type: F, city: 'Madrid', province: 'Madrid' },
  { name: 'Sociedad Científica Informática de España (SCIE)', type: F, city: 'Madrid', province: 'Madrid' },
  { name: 'Unibasq – Agencia de Calidad del Sistema Universitario Vasco', type: A, city: 'Vitoria-Gasteiz', province: 'Araba/Álava' },
  { name: 'Vall d’Hebron Institut de Recerca', type: C, city: 'Barcelona', province: 'Barcelona' },
  // Universities
  { name: 'Universidad Alfonso X El Sabio', type: U, city: 'Villanueva de la Cañada', province: 'Madrid' },
  { name: 'Universidad Autónoma de Barcelona', type: U, city: 'Cerdanyola del Vallès', province: 'Barcelona' },
  { name: 'Universidad Autónoma de Madrid', type: U, city: 'Madrid', province: 'Madrid' },
  { name: 'Universidad Camilo José Cela', type: U, city: 'Villanueva de la Cañada', province: 'Madrid' },
  { name: 'Universidad Carlos III de Madrid', type: U, city: 'Getafe', province: 'Madrid' },
  { name: 'Universidad Católica San Antonio de Murcia', type: U, city: 'Murcia', province: 'Murcia' },
  { name: 'Universidad Católica Santa Teresa de Jesús de Ávila', type: U, city: 'Ávila', province: 'Ávila' },
  { name: 'Universidad CEU Cardenal Herrera', type: U, city: 'Alfara del Patriarca', province: 'Valencia' },
  { name: 'Universidad Complutense de Madrid', type: U, city: 'Madrid', province: 'Madrid' },
  { name: 'Universidad de Alcalá', type: U, city: 'Alcalá de Henares', province: 'Madrid' },
  { name: 'Universidad de Alicante', type: U, city: 'San Vicente del Raspeig', province: 'Alicante' },
  { name: 'Universidad de Almería', type: U, city: 'Almería', province: 'Almería' },
  { name: 'Universidad de Burgos', type: U, city: 'Burgos', province: 'Burgos' },
  { name: 'Universidad de Castilla-La Mancha', type: U, city: 'Ciudad Real', province: 'Ciudad Real' },
  { name: 'Universidad de Córdoba', type: U, city: 'Córdoba', province: 'Córdoba' },
  { name: 'Universidad de Deusto', type: U, city: 'Bilbao', province: 'Bizkaia' },
  { name: 'Universidad de Extremadura', type: U, city: 'Badajoz', province: 'Badajoz' },
  { name: 'Universidad de Jaén', type: U, city: 'Jaén', province: 'Jaén' },
  { name: 'Universidad de La Laguna', type: U, city: 'San Cristóbal de La Laguna', province: 'Santa Cruz de Tenerife' },
  { name: 'Universidad de La Rioja', type: U, city: 'Logroño', province: 'La Rioja' },
  { name: 'Universidad de Málaga', type: U, city: 'Málaga', province: 'Málaga' },
  { name: 'Universidad de Murcia', type: U, city: 'Murcia', province: 'Murcia' },
  { name: 'Universidad de Navarra', type: U, city: 'Pamplona', province: 'Navarra' },
  { name: 'Universidad de Oviedo', type: U, city: 'Oviedo', province: 'Asturias' },
  { name: 'Universidad de Salamanca', type: U, city: 'Salamanca', province: 'Salamanca' },
  { name: 'Universidad de Sevilla', type: U, city: 'Sevilla', province: 'Sevilla' },
  { name: 'Universidad de Zaragoza', type: U, city: 'Zaragoza', province: 'Zaragoza' },
  { name: 'Universidad del País Vasco / Euskal Herriko Unibertsitatea', type: U, city: 'Leioa', province: 'Bizkaia' },
  { name: 'Universidad Internacional de La Rioja', type: U, city: 'Logroño', province: 'La Rioja' },
  { name: 'Universidad Internacional de Valencia', type: U, city: 'Valencia', province: 'Valencia' },
  { name: 'Universidad Loyola de Andalucía', type: U, city: 'Dos Hermanas', province: 'Sevilla' },
  { name: 'Universidad Miguel Hernández de Elche', type: U, city: 'Elche', province: 'Alicante' },
  { name: 'Universidad Nacional de Educación a Distancia (UNED)', type: U, city: 'Madrid', province: 'Madrid' },
  { name: 'Universidad Nebrija', type: U, city: 'Madrid', province: 'Madrid' },
  { name: 'Universidad Pablo de Olavide', type: U, city: 'Sevilla', province: 'Sevilla' },
  { name: 'Universidad Politécnica de Cartagena', type: U, city: 'Cartagena', province: 'Murcia' },
  { name: 'Universidad Politécnica de Madrid', type: U, city: 'Madrid', province: 'Madrid' },
  { name: 'Universidad Pontificia Comillas', type: U, city: 'Madrid', province: 'Madrid' },
  { name: 'Universidad Pública de Navarra', type: U, city: 'Pamplona', province: 'Navarra' },
  { name: 'Universidad Rey Juan Carlos', type: U, city: 'Móstoles', province: 'Madrid' },
  { name: 'Universidad San Pablo CEU', type: U, city: 'Madrid', province: 'Madrid' },
  { name: 'Universidade de A Coruña', type: U, city: 'A Coruña', province: 'A Coruña' },
  { name: 'Universidade de Santiago de Compostela', type: U, city: 'Santiago de Compostela', province: 'A Coruña' },
  { name: 'Universidade de Vigo', type: U, city: 'Vigo', province: 'Pontevedra' },
  { name: 'Universitat Abat Oliba CEU', type: U, city: 'Barcelona', province: 'Barcelona' },
  { name: 'Universitat de Barcelona', type: U, city: 'Barcelona', province: 'Barcelona' },
  { name: 'Universitat de Girona', type: U, city: 'Girona', province: 'Girona' },
  { name: 'Universitat de les Illes Balears', type: U, city: 'Palma', province: 'Illes Balears' },
  { name: 'Universitat de Lleida', type: U, city: 'Lleida', province: 'Lleida' },
  { name: 'Universitat de València', type: U, city: 'Valencia', province: 'Valencia' },
  { name: 'Universitat de Vic – Central University of Catalonia', type: U, city: 'Vic', province: 'Barcelona' },
  { name: 'Universitat Jaume I', type: U, city: 'Castelló de la Plana', province: 'Castellón' },
  { name: 'Universitat Oberta de Catalunya', type: U, city: 'Barcelona', province: 'Barcelona' },
  { name: 'Universitat Politècnica de Catalunya', type: U, city: 'Barcelona', province: 'Barcelona' },
  { name: 'Universitat Politècnica de València', type: U, city: 'Valencia', province: 'Valencia' },
  { name: 'Universitat Ramon Llull', type: U, city: 'Barcelona', province: 'Barcelona' },
  { name: 'Universitat Rovira i Virgili', type: U, city: 'Tarragona', province: 'Tarragona' },
];
