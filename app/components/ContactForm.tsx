"use client";

import { useState } from "react";

function Label({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-sm font-extrabold text-slate-800">
      {children}
      {required && <span className="mr-1 text-red-600">*</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

export default function ContactForm({ lang = "ar" }: { lang?: "ar" | "en" }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const isAr = lang === "ar";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[28px] border border-green-200 bg-green-50 p-6 text-center shadow-sm md:p-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl font-extrabold text-green-700">
          ✓
        </div>

        <h3 className="text-2xl font-extrabold text-green-800">
          {isAr ? "تم إرسال رسالتك بنجاح" : "Your message has been sent"}
        </h3>

        <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-green-700">
          {isAr
            ? "شكراً لتواصلك معنا. سنراجع رسالتك ونعود إليك في أقرب وقت ممكن."
            : "Thank you for contacting us. We will review your message and get back to you as soon as possible."}
        </p>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center justify-center rounded-2xl bg-green-700 px-7 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-green-800"
        >
          {isAr ? "إرسال رسالة أخرى" : "Send another message"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label required>{isAr ? "الاسم الكامل" : "Full Name"}</Label>
          <input
            name="name"
            type="text"
            required
            placeholder={isAr ? "اكتب اسمك الكامل" : "Your full name"}
            className={inputClass}
          />
        </div>

        <div>
          <Label required>
            {isAr ? "البريد الإلكتروني" : "Email Address"}
          </Label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={inputClass}
            dir="ltr"
          />
        </div>

        <div>
          <Label>{isAr ? "رقم الهاتف" : "Phone Number"}</Label>
          <input
            name="phone"
            type="tel"
            placeholder={isAr ? "اختياري" : "Optional"}
            className={inputClass}
            dir="ltr"
          />
        </div>

        <div>
          <Label required>{isAr ? "نوع الطلب" : "Inquiry Type"}</Label>
          <select name="type" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              {isAr ? "اختر نوع الطلب" : "Select inquiry type"}
            </option>
            <option value="General Inquiry">
              {isAr ? "استفسار عام" : "General Inquiry"}
            </option>
            <option value="Content Update">
              {isAr ? "تحديث محتوى" : "Content Update"}
            </option>
            <option value="Broker Inquiry">
              {isAr ? "استفسار عن شركة تداول" : "Broker Inquiry"}
            </option>
            <option value="Partnership">
              {isAr ? "شراكة أو تعاون" : "Partnership"}
            </option>
            <option value="Advertising">
              {isAr ? "إعلان أو رعاية" : "Advertising"}
            </option>
            <option value="Technical Issue">
              {isAr ? "مشكلة تقنية" : "Technical Issue"}
            </option>
          </select>
        </div>

        <div className="md:col-span-2">
          <Label required>{isAr ? "عنوان الرسالة" : "Subject"}</Label>
          <input
            name="subject"
            type="text"
            required
            placeholder={isAr ? "اكتب عنواناً مختصراً" : "Brief subject"}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <Label required>{isAr ? "الرسالة" : "Message"}</Label>
        <textarea
          name="message"
          required
          rows={6}
          placeholder={
            isAr ? "اكتب رسالتك هنا..." : "Write your message here..."
          }
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
          {isAr
            ? "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى."
            : "Something went wrong while sending your message. Please try again."}
        </div>
      )}

      <div className="mt-5 flex flex-col gap-4 border-t border-slate-200 pt-5 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-7 text-slate-500">
          {isAr
            ? "يرجى عدم إرسال كلمات مرور، بيانات دفع، أو معلومات دخول خاصة بحسابات التداول."
            : "Please avoid sending passwords, payment details, or trading account login information."}
        </p>

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-2xl bg-blue-700 px-8 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading"
            ? isAr
              ? "جارٍ الإرسال..."
              : "Sending..."
            : isAr
              ? "إرسال الرسالة"
              : "Send Message"}
        </button>
      </div>
    </form>
  );
}