export type SectionId =
  | "overview"
  | "entry"
  | "cases"
  | "documents"
  | "ingestion"
  | "intelligence"
  | "fingerprint"
  | "security"
  | "access"
  | "workspace"
  | "audit"
  | "integrity"
  | "tampering"
  | "archive"
  | "final";

export type Stat = { label: string; value: string };

export type SectionContent = {
  id: SectionId;
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  stats?: Stat[];
  tone?: "neutral" | "verified" | "breach";
};

export const NAV_LINKS: { label: string; target: SectionId }[] = [
  { label: "Overview", target: "overview" },
  { label: "Cases", target: "cases" },
  { label: "Documents", target: "documents" },
  { label: "Security", target: "security" },
  { label: "Audit", target: "audit" },
  { label: "Workspace", target: "workspace" },
];

export const CASE_FILES = [
  { id: "FIR-2291/26", type: "FIR", jurisdiction: "Sector 14 · District Court", items: 47 },
  { id: "CR-0184/26", type: "Chargesheet", jurisdiction: "Cyber Cell · State", items: 23 },
  { id: "ST-7740/25", type: "Witness Statement", jurisdiction: "Sessions Court", items: 12 },
  { id: "FR-0912/26", type: "Forensic Report", jurisdiction: "Central Lab", items: 8 },
];

export const FOCUS_DOCUMENT = {
  name: "FIR-2291-26_Primary_Statement.pdf",
  source: "Station Terminal · PS-14 · Verified Uplink",
  timestamp: "2026-08-24 09:41:07 IST",
  docType: "First Information Report",
  authenticity: "Source Verified",
  size: "2.4 MB · 14 pages",
  hash: "9f2c4a71d38e05b6c1af73e920d4a5b8ce61f0473a9d2e8c5b71fa03d64e92b7",
};

export const INGESTION_CHECKS = [
  { label: "File type", value: "PDF/A-2b" },
  { label: "Metadata", value: "Complete" },
  { label: "Source chain", value: "Signed" },
  { label: "Structure", value: "Valid" },
];

export const AI_EXTRACTION = {
  entities: ["R. Malhotra (Complainant)", "PS-14 Duty Officer", "Vehicle DL-3C-AF-2019"],
  dates: ["23 Aug 2026 · 22:10", "24 Aug 2026 · 09:41"],
  locations: ["Sector 14 Market", "NH-48 Service Lane"],
  summary:
    "Complainant reports unauthorised access to a commercial premises at 22:10 on 23 Aug 2026. Two witness statements corroborate the timeline. Forensic imaging of the on-site terminal is pending lab confirmation.",
};

export const SECURITY_LAYERS = [
  { label: "AES-256 Encryption", detail: "At-rest envelope encryption, rotated keys" },
  { label: "TLS 1.3", detail: "In-transit channel, pinned certificates" },
  { label: "Digital Signature", detail: "RSA-4096 issuer signature attached" },
  { label: "Secure Storage", detail: "Write-once object store, region locked" },
  { label: "Integrity Protection", detail: "Continuous SHA-256 re-verification" },
];

export const ROLES = [
  { role: "Police Officer", view: true, download: true, modify: false, share: false },
  { role: "Investigator", view: true, download: true, modify: true, share: true },
  { role: "Lawyer", view: true, download: true, modify: false, share: true },
  { role: "Judge", view: true, download: true, modify: false, share: false },
  { role: "Administrator", view: true, download: false, modify: false, share: true },
];

export const COLLABORATION = [
  { actor: "Inv. A. Sharma", action: "Added review note on page 4", time: "10:02" },
  { actor: "Adv. N. Rao", action: "Requested clarification · clause 3", time: "11:18" },
  { actor: "Hon. Judge M. Iyer", action: "Approved for hearing record", time: "14:35" },
  { actor: "Admin · Registry", action: "Applied digital signature", time: "15:07" },
];

export const AUDIT_EVENTS = [
  { action: "UPLOAD", user: "PS-14 Duty Officer", time: "24 Aug · 09:41", device: "Station Terminal", version: "v1.0" },
  { action: "VIEW", user: "Inv. A. Sharma", time: "24 Aug · 10:02", device: "Field Tablet", version: "v1.0" },
  { action: "REVIEW", user: "Inv. A. Sharma", time: "24 Aug · 10:24", device: "Field Tablet", version: "v1.0" },
  { action: "MODIFY", user: "Registry Clerk", time: "25 Aug · 09:12", device: "Registry Desk", version: "v1.1" },
  { action: "SHARE", user: "Adv. N. Rao", time: "25 Aug · 11:18", device: "Secure Portal", version: "v1.1" },
  { action: "SIGN", user: "Admin · Registry", time: "26 Aug · 15:07", device: "HSM Console", version: "v1.1" },
  { action: "APPROVE", user: "Hon. Judge M. Iyer", time: "26 Aug · 16:40", device: "Bench Terminal", version: "v1.1" },
];

export const ARCHIVE_STATES = [
  "BACKUP VERIFIED",
  "LEGAL HOLD ACTIVE",
  "RETENTION POLICY APPLIED",
  "ARCHIVAL COMPLETE",
];

export const SECTIONS: SectionContent[] = [
  {
    id: "overview",
    index: "00",
    eyebrow: "Secure gateway",
    title: "TRUST IS VERIFIED.",
    body: "A sealed environment for legal evidence. Every document that enters is identified, fingerprinted and permanently accounted for.",
  },
  {
    id: "entry",
    index: "01",
    eyebrow: "Secure entry",
    title: "Identity before access.",
    body: "Credential verification, hardware-backed multi-factor challenge and an authenticated transport channel are established before a single byte is served.",
    stats: [
      { label: "Identity", value: "Verified" },
      { label: "MFA", value: "FIDO2 · Passed" },
      { label: "Channel", value: "TLS 1.3" },
      { label: "Session", value: "Scoped · 30m" },
    ],
  },
  {
    id: "cases",
    index: "02",
    eyebrow: "Case space",
    title: "The evidence environment.",
    body: "FIRs, chargesheets, statements and forensic reports held as a single spatial case record — metadata forward, clutter removed.",
  },
  {
    id: "documents",
    index: "03",
    eyebrow: "Document",
    title: "One record, in focus.",
    body: "Source, timestamp, document type and authenticity resolve around the file before it is admitted into the system.",
  },
  {
    id: "ingestion",
    index: "04",
    eyebrow: "Ingestion",
    title: "Validated on entry.",
    body: "A single scanning pass confirms file type, metadata completeness, source chain and internal structure. Anything unresolved is rejected at the boundary.",
  },
  {
    id: "intelligence",
    index: "05",
    eyebrow: "AI intelligence",
    title: "From paper to structure.",
    body: "Optical recognition, entity extraction and relationship mapping convert a static file into queryable investigative intelligence.",
  },
  {
    id: "fingerprint",
    index: "06",
    eyebrow: "Digital fingerprint",
    title: "A cryptographic identity.",
    body: "The document is reduced to a SHA-256 fingerprint and bound to a trusted timestamp. This value becomes the document's identity for its entire life.",
  },
  {
    id: "security",
    index: "07",
    eyebrow: "Security vault",
    title: "Layered by design.",
    body: "Encryption, transport, signature, storage and continuous integrity protection wrap the record. Each layer is independently verifiable.",
  },
  {
    id: "access",
    index: "08",
    eyebrow: "Role-based access",
    title: "Authority, made explicit.",
    body: "Permissions are derived from role, case assignment and jurisdiction. Every request is evaluated; unauthorised attempts are refused and recorded.",
    tone: "breach",
  },
  {
    id: "workspace",
    index: "09",
    eyebrow: "Collaboration",
    title: "A shared, sealed workspace.",
    body: "Review, annotation, approval and digital signature happen inside the perimeter. Sharing issues scoped, revocable access — never a copy in the open.",
  },
  {
    id: "audit",
    index: "10",
    eyebrow: "Audit trail",
    title: "Every event, preserved.",
    body: "Upload, view, review, modify, share, sign and approve — each entry carries user, action, time, device and document version.",
  },
  {
    id: "integrity",
    index: "11",
    eyebrow: "Integrity check",
    title: "HASH MATCH",
    body: "DOCUMENT VERIFIED. No unauthorized changes detected.",
    tone: "verified",
  },
  {
    id: "tampering",
    index: "12",
    eyebrow: "Tampering detection",
    title: "INTEGRITY BREACH DETECTED",
    body: "DOCUMENT MODIFICATION IDENTIFIED. AUDIT INVESTIGATION REQUIRED.",
    tone: "breach",
  },
  {
    id: "archive",
    index: "13",
    eyebrow: "Archive",
    title: "Held for the long record.",
    body: "The verified record moves into cold custody with backup confirmation, legal hold and retention policy applied.",
  },
  {
    id: "final",
    index: "14",
    eyebrow: "Final reveal",
    title: "Trust is not assumed.\nIt is verified.",
    body: "The same document returns — now surrounded by verified identity, source, fingerprint, encryption, access history and a complete audit trail.",
  },
];
