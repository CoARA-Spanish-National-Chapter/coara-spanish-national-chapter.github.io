# Export the WG4 dissemination and training activities from the form's Google
# Sheet to src/data/activities.json, which the page Difusión y formación reads.
#
# Usage, from the repository root:
#   Rscript scripts/export_activities.R        (or: npm run activities)
#
# Needs a Google service-account key with read access to the sheet, given in
# COARA_SA_KEY; by default the form's local key next to this repository in the
# Work folder. The key is never part of this repository.
#
# Only public fields are exported: internal notes are left out, and a contact
# email only when the submitter ticked "contact_public" in the form. Exact
# duplicates (same institution, title, description and start date) are kept
# once, and HIDE lists submissions withheld from the site.

suppressMessages(library(googlesheets4))

SHEET_ID <- "11KyRgTZEF9co1YiFmWIsUdLcJOISAtAFPbAYIYyfOWo"
KEY <- Sys.getenv(
  "COARA_SA_KEY",
  unset = "../Coara_WG4_app/repo_form/app/google-service-account.json"
)
# COARA_OUT redirects the output, e.g. to compare with the published file
# without touching it (the /open check).
OUT <- Sys.getenv("COARA_OUT", unset = "src/data/activities.json")

# submission_id values not to publish (tests, withdrawn entries)
HIDE <- character(0)

gs4_auth(path = KEY)
d <- as.data.frame(read_sheet(SHEET_ID, sheet = 1, col_types = "c"))
d[is.na(d)] <- ""
if (!"contact_public" %in% names(d)) d$contact_public <- ""

d <- d[!d$submission_id %in% HIDE, ]
key <- paste(d$institution, d$activity_title, d$description, d$date_start,
             sep = "\r")
d <- d[!duplicated(key), ]

split_list <- function(x) {
  if (x == "") return(character(0))
  trimws(strsplit(x, ";", fixed = TRUE)[[1]])
}
type_label <- c(Difusion = "Difusión", Formacion = "Formación")

rows <- lapply(seq_len(nrow(d)), function(i) {
  r <- d[i, ]
  list(
    id = substr(r$submission_id, 1, 8),
    institution = r$institution,
    institutionType = r$institution_type,
    type = unname(ifelse(r$activity_type %in% names(type_label),
                         type_label[r$activity_type], r$activity_type)),
    category = r$dissemination_category,
    context = r$context,
    title = r$activity_title,
    description = r$description,
    dateStart = substr(r$date_start, 1, 10),
    dateEnd = substr(r$date_end, 1, 10),
    period = r$period_text,
    governance = r$governance,
    audience = I(split_list(r$target_audience)),
    format = r$format,
    topics = I(split_list(r$topics)),
    urls = I(Filter(nzchar, c(r$url, r$url2))),
    contactName = r$contact_name,
    contactEmail = if (r$contact_public == "Sí") r$contact_email else ""
  )
})

# Newest first: by start date, else the first year in the period text
sort_key <- vapply(rows, function(r) {
  if (nzchar(r$dateStart)) return(r$dateStart)
  y <- regmatches(r$period, regexpr("[0-9]{4}", r$period))
  if (length(y)) paste0(y, "-00-00") else "0000"
}, "")
rows <- rows[order(sort_key, decreasing = TRUE)]

jsonlite::write_json(
  list(exported = format(Sys.Date()), activities = rows),
  OUT, auto_unbox = TRUE, pretty = TRUE
)
cat(length(rows), "activities written to", OUT, "\n")
