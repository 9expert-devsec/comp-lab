/* Site-wide contact details and links. `null` means "not available yet" — the UI hides what depends on it. */
export const PHONE_DISPLAY = "02-219-4304-5";
export const PHONE_TEL = "tel:022194304";

export const CONTACT_FALLBACK_EMAIL = null;
export const PRIVACY_POLICY_URL = null;
export const COMPANY_PROFILE_URL = null;

/* Footer policy links; the whole "นโยบาย" column is hidden while every url is null. */
export const POLICY_LINKS = [
  { label: "นโยบายความเป็นส่วนตัว (PDPA)", url: PRIVACY_POLICY_URL },
  { label: "เงื่อนไขการใช้บริการ", url: null },
  { label: "นโยบายคุกกี้", url: null },
];

/* Footer social links; only those with a url render, and "ติดตามเรา" is hidden while all are null. */
export const social = { facebook: null, youtube: null, linkedin: null };

export const INHOUSE_QUOTE_URL = "https://www.9experttraining.com/registration/in-house/step-1";
export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/Be2MwFrZVqPfeXCU9";
export const GOOGLE_MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.467505991821!2d100.5311285!3d13.7506573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29d1d9b23ffe5%3A0xea1cd3822743c584!2s9Expert%20Training!5e0!3m2!1sen!2sth!4v1790657826308!5m2!1sen!2sth";
