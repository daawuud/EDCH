"use client";

import { FormEvent, useState } from "react";
import { siteContent } from "@/data/site-content";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] bg-white p-6 text-edch-ink shadow-soft ring-1 ring-blue-100 sm:p-8 dark:bg-white/10 dark:text-white dark:ring-white/10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" type="text" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone number" name="phone" type="tel" />
        <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
          I am interested in
          <select
            name="interest"
            className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-base font-semibold text-edch-ink outline-none transition focus:border-edch-green dark:border-white/10 dark:bg-slate-950 dark:text-white"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select an option
            </option>
            {siteContent.contactInterests.map((interest) => (
              <option key={interest}>{interest}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Message
        <textarea
          name="message"
          rows={6}
          className="resize-none rounded-2xl border border-blue-100 bg-white px-4 py-3 text-base font-semibold text-edch-ink outline-none transition focus:border-edch-green dark:border-white/10 dark:bg-slate-950 dark:text-white"
          required
        />
      </label>

      {submitted ? (
        <p
          role="status"
          className="mt-5 rounded-2xl bg-edch-mint p-4 font-bold text-edch-green"
        >
          Thank you for contacting EDCH. This form is ready for backend connection.
        </p>
      ) : null}

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-edch-blue px-7 py-4 font-black text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-blue-800 sm:w-auto"
      >
        Contact EDCH
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required = false
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-base font-semibold text-edch-ink outline-none transition focus:border-edch-green dark:border-white/10 dark:bg-slate-950 dark:text-white"
      />
    </label>
  );
}
