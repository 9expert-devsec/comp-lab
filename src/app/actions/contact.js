"use server";

import { readContact, validateContact } from "@/lib/contact";

/*
 * Returns { ok: true } | { ok: false, reason: 'invalid', errors } | { ok: false, reason: 'not_configured' | 'rejected' }.
 * Email delivery is not wired yet, so a valid submission reports not_configured.
 */
export async function submitContact(formData) {
  const values = readContact(formData);

  // Honeypot filled in: a bot. Give it a plain failure, not a hint about why.
  if (values.website) return { ok: false, reason: "rejected" };

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) return { ok: false, reason: "invalid", errors };

  // TODO: send the email once delivery is configured, then return { ok: true }.
  return { ok: false, reason: "not_configured" };
}
