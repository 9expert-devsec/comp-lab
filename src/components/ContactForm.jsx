"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { submitContact } from "@/app/actions/contact";
import Button from "@/components/Button";
import { FIELD_ORDER, TOPICS, readContact, validateContact } from "@/lib/contact";
import { CONTACT_FALLBACK_EMAIL, PHONE_DISPLAY, PHONE_TEL, PRIVACY_POLICY_URL } from "@/data/site";

const FIELD =
  "w-full min-h-[44px] rounded-lg border bg-white px-4 text-[0.9375rem] text-deep-navy " +
  "placeholder:text-deep-navy/50 focus:border-action-blue outline-none transition-colors hc-border";
const LABEL = "mb-1.5 block text-sm font-semibold text-deep-navy";
const ERROR_TEXT = "mt-1.5 text-sm font-medium text-[#c01c28]";

const fieldId = (name) => `contact-${name}`;
const errorId = (name) => `contact-${name}-error`;

const FAILURE_MESSAGE = {
  not_configured: "ขออภัย ระบบส่งแบบฟอร์มออนไลน์ยังไม่พร้อมใช้งาน ข้อมูลของคุณยังไม่ถูกส่ง",
  default: "ขออภัย ส่งข้อมูลไม่สำเร็จ ข้อมูลของคุณยังไม่ถูกส่ง",
};

function FieldError({ name, errors }) {
  if (!errors[name]) return null;
  return (
    <p id={errorId(name)} className={ERROR_TEXT}>
      {errors[name]}
    </p>
  );
}

/* Props that tie a control to its error message. */
function a11yProps(name, errors) {
  const invalid = Boolean(errors[name]);
  return {
    id: fieldId(name),
    name,
    "aria-invalid": invalid || undefined,
    "aria-describedby": invalid ? errorId(name) : undefined,
  };
}

function fieldClass(name, errors, extra = "") {
  return `${FIELD} ${errors[name] ? "border-[#c01c28]" : "border-deep-navy/25"} ${extra}`;
}

function ContactForm({ topic }) {
  const [type, setType] = useState(topic ?? "");
  const [prevTopic, setPrevTopic] = useState(topic);
  const [errors, setErrors] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [result, setResult] = useState(null);
  const [pending, startTransition] = useTransition();
  const focusNext = useRef(null);

  // A later ?topic= (e.g. clicking another "ปรึกษาเรื่อง …" button) preselects again.
  if (topic !== prevTopic) {
    setPrevTopic(topic);
    if (topic) setType(topic);
  }

  // Focus after render, so the error text already exists when the field is announced.
  useEffect(() => {
    if (!focusNext.current) return;
    document.getElementById(focusNext.current)?.focus();
    focusNext.current = null;
  }, [errors, result]);

  const showErrors = (errs) => {
    setErrors(errs);
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (first) focusNext.current = fieldId(first);
  };

  // After the first attempt, re-check as the user edits so fixed fields clear.
  const onChange = (e) => {
    if (!attempted) return;
    const next = validateContact(readContact(new FormData(e.currentTarget)));
    setErrors((prev) => Object.fromEntries(Object.keys(prev).filter((k) => next[k]).map((k) => [k, next[k]])));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (pending) return;
    const formData = new FormData(e.currentTarget);
    const errs = validateContact(readContact(formData));
    setAttempted(true);
    setResult(null);
    if (Object.keys(errs).length > 0) {
      showErrors(errs);
      return;
    }
    setErrors({});
    startTransition(async () => {
      let res;
      try {
        res = await submitContact(formData);
      } catch {
        res = { ok: false, reason: "error" };
      }
      if (res.reason === "invalid") {
        showErrors(res.errors);
        return;
      }
      if (!res.ok) focusNext.current = "contact-result";
      setResult(res);
    });
  };

  if (result?.ok === true) {
    return (
      <div
        role="status"
        className="mt-8 rounded-2xl border-2 border-signal-lime bg-signal-lime/10 p-8 text-center"
      >
        <p className="text-xl font-bold text-deep-navy">ขอบคุณสำหรับข้อมูล</p>
        <p className="mt-2 text-[0.9375rem] text-deep-navy/75">ทีมงานจะติดต่อกลับภายใน 1 วันทำการ</p>
      </div>
    );
  }

  const policy = PRIVACY_POLICY_URL ? (
    <a href={PRIVACY_POLICY_URL} className="font-semibold text-action-blue underline underline-offset-2">
      นโยบายความเป็นส่วนตัว
    </a>
  ) : (
    "นโยบายความเป็นส่วนตัว"
  );

  return (
    <form className="mt-8 space-y-5" onSubmit={onSubmit} onChange={onChange} noValidate aria-label="แบบฟอร์มติดต่อ">
      <p className="text-sm text-deep-navy/70">
        ช่องที่มีเครื่องหมาย <span aria-hidden="true">*</span>
        <span className="sr-only">ดอกจัน</span> จำเป็นต้องกรอก
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor={fieldId("name")} className={LABEL}>
            ชื่อ-นามสกุล <span aria-hidden="true">*</span>
          </label>
          <input {...a11yProps("name", errors)} type="text" required autoComplete="name" className={fieldClass("name", errors)} placeholder="สมชาย ใจดี" />
          <FieldError name="name" errors={errors} />
        </div>
        <div className="min-w-0">
          <label htmlFor={fieldId("org")} className={LABEL}>
            หน่วยงาน / องค์กร <span aria-hidden="true">*</span>
          </label>
          <input {...a11yProps("org", errors)} type="text" required autoComplete="organization" className={fieldClass("org", errors)} placeholder="ชื่อองค์กร" />
          <FieldError name="org" errors={errors} />
        </div>
        <div className="min-w-0">
          <label htmlFor={fieldId("email")} className={LABEL}>
            อีเมล <span aria-hidden="true">*</span>
          </label>
          <input {...a11yProps("email", errors)} type="email" required autoComplete="email" className={fieldClass("email", errors)} placeholder="name@company.co.th" />
          <FieldError name="email" errors={errors} />
        </div>
        <div className="min-w-0">
          <label htmlFor={fieldId("phone")} className={LABEL}>
            เบอร์โทร <span aria-hidden="true">*</span>
          </label>
          <input {...a11yProps("phone", errors)} type="tel" required autoComplete="tel" className={fieldClass("phone", errors)} placeholder="08x-xxx-xxxx" />
          <FieldError name="phone" errors={errors} />
        </div>
      </div>

      <div>
        <label htmlFor={fieldId("type")} className={LABEL}>
          ประเภทงาน <span aria-hidden="true">*</span>
        </label>
        <select
          {...a11yProps("type", errors)}
          required
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={fieldClass("type", errors)}
        >
          <option value="" disabled>
            เลือกประเภทงาน
          </option>
          {TOPICS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <FieldError name="type" errors={errors} />
      </div>

      <div>
        <label htmlFor={fieldId("detail")} className={LABEL}>
          รายละเอียด
        </label>
        <textarea
          {...a11yProps("detail", errors)}
          rows={4}
          className={fieldClass("detail", errors, "resize-y py-3")}
          placeholder="เล่ารายละเอียดความต้องการของทีม"
        />
        <FieldError name="detail" errors={errors} />
      </div>

      {/* Honeypot: invisible to people and assistive tech; bots that fill it are rejected server-side. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            {...a11yProps("consent", errors)}
            type="checkbox"
            required
            className="mt-1 h-5 w-5 shrink-0 accent-action-blue"
          />
          <label htmlFor={fieldId("consent")} className="text-sm leading-relaxed text-deep-navy/80">
            ข้าพเจ้ายินยอมให้ 9Expert เก็บและใช้ข้อมูลส่วนบุคคลเพื่อติดต่อกลับ ตาม{policy}{" "}
            <span aria-hidden="true">*</span>
          </label>
        </div>
        <FieldError name="consent" errors={errors} />
      </div>

      {result && !result.ok && (
        <div
          id="contact-result"
          role="alert"
          tabIndex={-1}
          className="rounded-2xl border-2 border-[#c01c28] bg-[#c01c28]/5 p-6"
        >
          <p className="text-base font-bold text-deep-navy">
            {FAILURE_MESSAGE[result.reason] ?? FAILURE_MESSAGE.default}
          </p>
          <p className="mt-2 text-[0.9375rem] text-deep-navy/80">
            กรุณาติดต่อทีมงานโดยตรงที่โทร{" "}
            <a href={PHONE_TEL} className="font-semibold text-action-blue underline underline-offset-2">
              {PHONE_DISPLAY}
            </a>
          </p>
          {CONTACT_FALLBACK_EMAIL && (
            <p className="mt-1 text-[0.9375rem] text-deep-navy/80">
              หรืออีเมล{" "}
              <a
                href={`mailto:${CONTACT_FALLBACK_EMAIL}`}
                className="font-semibold text-action-blue underline underline-offset-2"
              >
                {CONTACT_FALLBACK_EMAIL}
              </a>
            </p>
          )}
        </div>
      )}

      <Button variant="lime" type="submit" aria-disabled={pending || undefined}>
        {pending ? "กำลังส่งข้อมูล…" : "ส่งข้อมูล"}
      </Button>
    </form>
  );
}

function ContactFormFromUrl() {
  const topic = useSearchParams().get("topic");
  return <ContactForm topic={TOPICS.some((t) => t.value === topic) ? topic : null} />;
}

export { ContactForm, ContactFormFromUrl };
