/**
 * CoARA WG4 — receiver for the dissemination and training form on coara.es
 * (src/pages/formulario-wg4.astro).
 *
 * Published as a web app from the personal account: "Execute as: Me",
 * "Who has access: Anyone". The page POSTs a JSON body (sent as text/plain, so
 * the browser makes no CORS preflight); this script validates it again and
 * appends one row to the WG4 sheet, matching columns by the header in row 1.
 * The columns are the ones the Shiny form wrote (repo_form/app/app.R), so
 * scripts/export_activities.R reads both without change.
 */

const SHEET_ID = '11KyRgTZEF9co1YiFmWIsUdLcJOISAtAFPbAYIYyfOWo';

const COLUMNS = [
  'submission_id', 'timestamp', 'institution', 'institution_type',
  'contact_name', 'contact_email', 'activity_type',
  'dissemination_category', 'context', 'activity_title',
  'description', 'date_start', 'date_end', 'period_text',
  'governance', 'target_audience', 'format', 'topics',
  'url', 'url2', 'additional_notes', 'contact_public'
];

const ACTIVITY_TYPES = ['Difusion', 'Formacion'];
const MAX_LONG = 6000;   // description, governance, notes
const MAX_SHORT = 500;   // every other field
const LONG_FIELDS = ['description', 'governance', 'additional_notes'];
const MIN_SECONDS = 3;   // a person cannot fill the form faster than this

function doPost(e) {
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Spam traps: a hidden field people never see, and a minimum fill time.
    // Both answer as if the submission had worked, so a bot learns nothing.
    if (d.website || Number(d.elapsed) < MIN_SECONDS) {
      return reply_({ ok: true, id: '' });
    }

    const errors = validate_(d);
    if (errors.length) return reply_({ ok: false, errors: errors });

    const id = Utilities.getUuid();
    const rec = {
      submission_id: id,
      timestamp: Utilities.formatDate(new Date(), 'Etc/UTC', 'yyyy-MM-dd HH:mm:ss'),
      institution: d.institution,
      institution_type: d.institution_type,
      contact_name: d.contact_name,
      contact_email: d.contact_email,
      activity_type: d.activity_type,
      dissemination_category: d.activity_type === 'Difusion' ? d.dissemination_category : '',
      context: d.activity_type === 'Difusion' ? d.context : '',
      activity_title: d.activity_title,
      description: d.description,
      date_start: d.date_start,
      date_end: d.date_end,
      period_text: d.period_text,
      governance: d.governance,
      target_audience: join_(d.target_audience),
      format: d.format,
      topics: join_(d.topics),
      url: d.url,
      url2: d.url2,
      additional_notes: d.additional_notes,
      contact_public: d.contact_public === true ? 'Sí' : 'No'
    };

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
      const header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      if (header[0] !== 'submission_id') throw new Error('Unexpected header row');
      sheet.appendRow(header.map(function (h) { return safe_(rec[h]); }));
    } finally {
      lock.releaseLock();
    }
    return reply_({ ok: true, id: id });
  } catch (err) {
    console.error(err);
    return reply_({ ok: false, errors: ['server'] });
  }
}

// Lets a browser visit to the web-app address confirm that it is running.
function doGet() {
  return reply_({ ok: true, service: 'CoARA WG4 form receiver' });
}

function validate_(d) {
  const errors = [];
  const str = function (k) { return typeof d[k] === 'string' ? d[k].trim() : ''; };
  COLUMNS.forEach(function (k) {
    if (typeof d[k] === 'string') d[k] = d[k].trim();
  });
  ['target_audience', 'topics'].forEach(function (k) {
    if (!Array.isArray(d[k])) d[k] = [];
    d[k] = d[k].filter(function (x) { return typeof x === 'string'; });
  });
  ['contact_name', 'contact_email', 'dissemination_category', 'context',
   'date_start', 'date_end', 'period_text', 'governance', 'format', 'url',
   'url2', 'additional_notes'].forEach(function (k) { d[k] = str(k); });

  if (!str('institution')) errors.push('Institución');
  if (!str('institution_type')) errors.push('Tipo de institución');
  if (ACTIVITY_TYPES.indexOf(d.activity_type) < 0) errors.push('Tipo de actividad');
  if (!str('activity_title')) errors.push('Nombre de la actividad');
  if (!str('description')) errors.push('Descripción');
  if (d.contact_email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.contact_email)) {
    errors.push('Correo electrónico (formato no válido)');
  }
  if (d.url && !/^https?:\/\//.test(d.url)) errors.push('URL (debe empezar con http:// o https://)');
  if (d.url2 && !/^https?:\/\//.test(d.url2)) errors.push('URL adicional (debe empezar con http:// o https://)');

  const iso = /^\d{4}-\d{2}-\d{2}$/;
  if (d.date_start && !iso.test(d.date_start)) d.date_start = '';
  if (d.date_end && !iso.test(d.date_end)) d.date_end = '';
  // As in the Shiny form, dates are kept only when both are given.
  if (!(d.date_start && d.date_end)) { d.date_start = ''; d.date_end = ''; }
  if (d.date_start && d.date_end < d.date_start) {
    errors.push('La fecha de fin debe ser posterior a la de inicio');
  }

  COLUMNS.forEach(function (k) {
    const max = LONG_FIELDS.indexOf(k) >= 0 ? MAX_LONG : MAX_SHORT;
    if (typeof d[k] === 'string' && d[k].length > max) errors.push('Texto demasiado largo: ' + k);
  });
  return errors;
}

function join_(xs) {
  return (xs || []).join(';');
}

// Text that starts like a formula is stored as text, never evaluated.
function safe_(v) {
  if (v === undefined || v === null) return '';
  const s = String(v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
