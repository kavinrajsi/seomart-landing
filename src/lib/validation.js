// Shared lead-form validators — used by both the client form and the
// /api/audit route so client and server enforce the same rules.

const NAME_RE = /^[A-Za-z ]+$/; // letters + spaces only
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Indian mobile: optional +91 / 91 prefix, then 10 digits starting 6-9.
const PHONE_RE = /^(?:\+?91)?[6-9]\d{9}$/;

export function normalizePhone(value = "") {
  return String(value).replace(/[\s-]/g, "");
}

export function validateName(value = "") {
  const v = String(value).trim();
  if (!v) return "Please enter your name.";
  if (!NAME_RE.test(v)) return "Use letters and spaces only.";
  if (v.length < 3) return "Name must be at least 3 characters.";
  return null;
}

export function validateEmail(value = "") {
  const v = String(value).trim();
  if (!v) return "Please enter your email.";
  if (!EMAIL_RE.test(v)) return "Enter a valid email address.";
  return null;
}

export function validatePhone(value = "") {
  const v = normalizePhone(value);
  if (!v) return "Please enter your phone number.";
  if (!PHONE_RE.test(v)) return "Enter a valid Indian mobile number.";
  return null;
}

// Returns an object of { field: message } for every invalid field. Empty
// object means the payload is valid. `message` is optional and unvalidated.
export function validateLead(values = {}) {
  const errors = {};
  const name = validateName(values.name);
  if (name) errors.name = name;
  const email = validateEmail(values.email);
  if (email) errors.email = email;
  const phone = validatePhone(values.phone);
  if (phone) errors.phone = phone;
  return errors;
}
