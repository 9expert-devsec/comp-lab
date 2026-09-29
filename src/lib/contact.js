/* Contact form rules, shared by the client form and the submitContact server action. */

export const TOPICS = [
  { value: "consulting", label: "Data · AI · Automation" },
  { value: "accessibility", label: "Web Accessibility" },
  { value: "other", label: "อื่นๆ" },
];

/* Field order = DOM order; the first invalid field in this order receives focus. */
export const FIELD_ORDER = ["name", "org", "email", "phone", "type", "detail", "consent"];

const MAX = { name: 200, org: 200, email: 254, phone: 30, detail: 2000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9][0-9\s-]{7,19}$/;

export function readContact(formData) {
  const str = (k) => String(formData.get(k) ?? "").trim();
  return {
    name: str("name"),
    org: str("org"),
    email: str("email"),
    phone: str("phone"),
    type: str("type"),
    detail: str("detail"),
    consent: formData.get("consent") === "on",
    website: str("website"),
  };
}

export function validateContact(v) {
  const errors = {};
  if (!v.name) errors.name = "กรุณากรอกชื่อ-นามสกุล";
  else if (v.name.length > MAX.name) errors.name = "ชื่อ-นามสกุลยาวเกินไป";

  if (!v.org) errors.org = "กรุณากรอกชื่อหน่วยงานหรือองค์กร";
  else if (v.org.length > MAX.org) errors.org = "ชื่อหน่วยงานยาวเกินไป";

  if (!v.email) errors.email = "กรุณากรอกอีเมล";
  else if (v.email.length > MAX.email || !EMAIL_RE.test(v.email))
    errors.email = "รูปแบบอีเมลไม่ถูกต้อง เช่น name@company.co.th";

  if (!v.phone) errors.phone = "กรุณากรอกเบอร์โทร";
  else if (v.phone.length > MAX.phone || !PHONE_RE.test(v.phone))
    errors.phone = "รูปแบบเบอร์โทรไม่ถูกต้อง เช่น 08x-xxx-xxxx";

  if (!TOPICS.some((t) => t.value === v.type)) errors.type = "กรุณาเลือกประเภทงาน";

  if (v.detail.length > MAX.detail) errors.detail = `รายละเอียดต้องไม่เกิน ${MAX.detail} ตัวอักษร`;

  if (!v.consent) errors.consent = "กรุณายินยอมให้เก็บและใช้ข้อมูลเพื่อติดต่อกลับ";
  return errors;
}
