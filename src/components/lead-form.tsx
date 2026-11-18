"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type Variant = "residential" | "commercial" | "contact";

type LeadFormProps = {
  variant: Variant;
  sourcePage: string;
  submitLabel: string;
  note?: string;
};

const propertyTypes = [
  "Apartment",
  "Penthouse",
  "Townhouse",
  "Detached home",
  "Country residence",
  "Other",
];

const homeSizes = [
  "Under 1,000 sq ft",
  "1,000 – 2,000 sq ft",
  "2,000 – 3,500 sq ft",
  "3,500 – 5,000 sq ft",
  "5,000 sq ft +",
];

const commercialTypes = [
  "Office",
  "Retail / showroom",
  "Commercial property",
  "Clinic / practice",
  "Hospitality",
  "Other",
];

const commercialSizes = [
  "Under 2,000 sq ft",
  "2,000 – 5,000 sq ft",
  "5,000 – 10,000 sq ft",
  "10,000 – 25,000 sq ft",
  "25,000 sq ft +",
];

const residentialServices = [
  "Regular home cleaning",
  "Deep cleaning",
  "Move-in / move-out",
  "Customised arrangement",
];

const commercialServices = [
  "Office cleaning",
  "Retail & showroom",
  "Commercial property",
  "Customised programme",
];

const frequencies = [
  "Daily",
  "Weekly",
  "Fortnightly",
  "Monthly",
  "One-off clean",
  "To be discussed",
];

export default function LeadForm({
  variant,
  sourcePage,
  submitLabel,
  note,
}: LeadFormProps) {
  const [values, setValues] = useState<Record<string, string>>({
    enquiryFor: "Residential",
  });
  const [services, setServices] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const update = (key: string, value: string) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    setFieldErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  const toggleService = (service: string) => {
    setServices((previous) =>
      previous.includes(service)
        ? previous.filter((item) => item !== service)
        : [...previous, service],
    );
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setMessage("");
    setFieldErrors({});

    const elapsedMs = startedAt.current
      ? Date.now() - startedAt.current
      : 10000;

    const payload = {
      type: variant,
      ...values,
      services:
        variant === "contact"
          ? [`${values.enquiryFor ?? "Residential"} enquiry`]
          : services,
      website: honeypot,
      elapsedMs,
      sourcePage,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        reference?: string;
        error?: string;
        errors?: Record<string, string>;
      };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(
          data.error ??
            `Something went wrong. Please call ${site.phoneDisplay} and we will assist you personally.`,
        );
        if (data.errors) setFieldErrors(data.errors);
        return;
      }

      setSubmittedName((values.name ?? "").trim().split(" ")[0] ?? "");
      setReference(data.reference ?? "");
      setStatus("success");
      setValues({ enquiryFor: "Residential" });
      setServices([]);
    } catch {
      setStatus("error");
      setMessage(
        `We could not send your enquiry. Please call ${site.phoneDisplay} or email ${site.email}.`,
      );
    }
  };

  if (status === "success") {
    return (
      <div className="border border-champagne/40 bg-white/80 p-8 md:p-12">
        <span className="eyebrow">Enquiry received</span>
        <h3 className="mt-5 font-display text-3xl text-navy sm:text-[2.4rem]">
          Thank you{submittedName ? `, ${submittedName}` : ""}. We will be in
          touch shortly.
        </h3>
        <p className="mt-5 text-[0.95rem] leading-relaxed text-charcoal/70">
          A member of our team will review the details of your space and respond
          personally with the next steps. For anything urgent, you are always
          welcome to call us directly.
        </p>
        {reference && (
          <p className="mt-6 inline-flex items-center gap-3 border border-stone px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-charcoal/60">
            Reference <span className="text-navy">{reference}</span>
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={site.phoneHref} className="btn btn-navy">
            Call {site.phoneDisplay}
          </a>
          <a href={site.emailHref} className="btn btn-outline-dark">
            Email our team
          </a>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-charcoal/50 underline decoration-champagne/60 underline-offset-4 transition-colors hover:text-navy"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const fieldClass = (key: string) =>
    `field ${fieldErrors[key] ? "!border-red-700/50 !bg-red-50/50" : ""}`;

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {variant === "residential" && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="rf-name"
              label="Full name"
              required
              value={values.name ?? ""}
              onChange={(value) => update("name", value)}
              autoComplete="name"
              error={fieldErrors.name}
              className={fieldClass("name")}
            />
            <TextField
              id="rf-email"
              label="Email address"
              type="email"
              required
              value={values.email ?? ""}
              onChange={(value) => update("email", value)}
              autoComplete="email"
              error={fieldErrors.email}
              className={fieldClass("email")}
            />
            <TextField
              id="rf-phone"
              label="Phone number"
              type="tel"
              required
              value={values.phone ?? ""}
              onChange={(value) => update("phone", value)}
              autoComplete="tel"
              error={fieldErrors.phone}
              className={fieldClass("phone")}
            />
            <TextField
              id="rf-address"
              label="Property location"
              placeholder="Area or postcode"
              value={values.propertyAddress ?? ""}
              onChange={(value) => update("propertyAddress", value)}
              autoComplete="address-level2"
              className={fieldClass("propertyAddress")}
            />
            <SelectField
              id="rf-property-type"
              label="Type of property"
              options={propertyTypes}
              value={values.propertyType ?? ""}
              onChange={(value) => update("propertyType", value)}
              className={fieldClass("propertyType")}
            />
            <SelectField
              id="rf-property-size"
              label="Approximate property size"
              options={homeSizes}
              value={values.propertySize ?? ""}
              onChange={(value) => update("propertySize", value)}
              className={fieldClass("propertySize")}
            />
          </div>
          <ServiceCheckboxes
            legend="Cleaning services required"
            options={residentialServices}
            selected={services}
            onToggle={toggleService}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="rf-date"
              label="Preferred cleaning date"
              type="date"
              value={values.preferredDate ?? ""}
              onChange={(value) => update("preferredDate", value)}
              className={fieldClass("preferredDate")}
            />
            <div className="hidden sm:block" />
          </div>
          <TextArea
            id="rf-message"
            label="Additional details"
            placeholder="Tell us about your home, access arrangements or any specific priorities."
            value={values.message ?? ""}
            onChange={(value) => update("message", value)}
            error={fieldErrors.message}
            className={fieldClass("message")}
          />
        </>
      )}

      {variant === "commercial" && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="cf-name"
              label="Contact person"
              required
              value={values.name ?? ""}
              onChange={(value) => update("name", value)}
              autoComplete="name"
              error={fieldErrors.name}
              className={fieldClass("name")}
            />
            <TextField
              id="cf-company"
              label="Company name"
              required
              value={values.company ?? ""}
              onChange={(value) => update("company", value)}
              autoComplete="organization"
              error={fieldErrors.company}
              className={fieldClass("company")}
            />
            <TextField
              id="cf-email"
              label="Business email"
              type="email"
              required
              value={values.email ?? ""}
              onChange={(value) => update("email", value)}
              autoComplete="email"
              error={fieldErrors.email}
              className={fieldClass("email")}
            />
            <TextField
              id="cf-phone"
              label="Phone number"
              type="tel"
              required
              value={values.phone ?? ""}
              onChange={(value) => update("phone", value)}
              autoComplete="tel"
              error={fieldErrors.phone}
              className={fieldClass("phone")}
            />
            <TextField
              id="cf-address"
              label="Property address"
              placeholder="Building name or postcode"
              value={values.propertyAddress ?? ""}
              onChange={(value) => update("propertyAddress", value)}
              autoComplete="street-address"
              className={`${fieldClass("propertyAddress")} sm:col-span-2`}
            />
            <SelectField
              id="cf-property-type"
              label="Type of commercial property"
              options={commercialTypes}
              value={values.propertyType ?? ""}
              onChange={(value) => update("propertyType", value)}
              className={fieldClass("propertyType")}
            />
            <SelectField
              id="cf-size"
              label="Approximate square footage"
              options={commercialSizes}
              value={values.propertySize ?? ""}
              onChange={(value) => update("propertySize", value)}
              className={fieldClass("propertySize")}
            />
          </div>
          <ServiceCheckboxes
            legend="Cleaning requirements"
            options={commercialServices}
            selected={services}
            onToggle={toggleService}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              id="cf-frequency"
              label="Desired cleaning frequency"
              options={frequencies}
              value={values.frequency ?? ""}
              onChange={(value) => update("frequency", value)}
              className={fieldClass("frequency")}
            />
            <div className="hidden sm:block" />
          </div>
          <TextArea
            id="cf-message"
            label="Additional information"
            placeholder="Share your operating hours, access requirements and any presentation standards we should meet."
            value={values.message ?? ""}
            onChange={(value) => update("message", value)}
            error={fieldErrors.message}
            className={fieldClass("message")}
          />
        </>
      )}

      {variant === "contact" && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="ct-name"
              label="Name"
              required
              value={values.name ?? ""}
              onChange={(value) => update("name", value)}
              autoComplete="name"
              error={fieldErrors.name}
              className={fieldClass("name")}
            />
            <TextField
              id="ct-phone"
              label="Phone"
              type="tel"
              value={values.phone ?? ""}
              onChange={(value) => update("phone", value)}
              autoComplete="tel"
              error={fieldErrors.phone}
              className={fieldClass("phone")}
            />
            <TextField
              id="ct-email"
              label="Email"
              type="email"
              required
              value={values.email ?? ""}
              onChange={(value) => update("email", value)}
              autoComplete="email"
              error={fieldErrors.email}
              className={fieldClass("email")}
            />
            <div>
              <label htmlFor="ct-enquiry" className="label-lux">
                Residential or commercial
              </label>
              <select
                id="ct-enquiry"
                value={values.enquiryFor ?? "Residential"}
                onChange={(event) => update("enquiryFor", event.target.value)}
                className="field appearance-none"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
          </div>
          <TextArea
            id="ct-message"
            label="Message"
            required
            placeholder="Tell us a little about your space and what you are looking for."
            value={values.message ?? ""}
            onChange={(value) => update("message", value)}
            error={fieldErrors.message}
            className={fieldClass("message")}
          />
        </>
      )}

      {status === "error" && message && (
        <p
          role="alert"
          className="border-l-2 border-red-800 bg-red-50/60 px-4 py-3 text-sm text-red-900"
        >
          {message}
        </p>
      )}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-gold w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Sending enquiry" : submitLabel}
        </button>
        <p className="max-w-xs text-[0.7rem] leading-relaxed text-charcoal/50">
          {note ?? "Your details remain private and are used only to respond to your enquiry."}
        </p>
      </div>
    </form>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  autoComplete,
  error,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  className?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label-lux">
        {label}
        {required && <span className="ml-1 text-champagne">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className={className ?? "field"}
        aria-invalid={error ? true : undefined}
      />
      {error && <p className="mt-1.5 text-[0.72rem] text-red-800">{error}</p>}
    </div>
  );
}

function SelectField({
  id,
  label,
  options,
  value,
  onChange,
  className,
}: {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label-lux">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${className ?? "field"} appearance-none pr-10`}
        >
          <option value="">Please select</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 12 8"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 h-2 w-3 -translate-y-1/2 stroke-charcoal/50"
        >
          <path d="m1 1.5 5 5 5-5" fill="none" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  );
}

function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label-lux">
        {label}
        {required && <span className="ml-1 text-champagne">*</span>}
      </label>
      <textarea
        id={id}
        name={id}
        rows={5}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`${className ?? "field"} resize-y`}
        aria-invalid={error ? true : undefined}
      />
      {error && <p className="mt-1.5 text-[0.72rem] text-red-800">{error}</p>}
    </div>
  );
}

function ServiceCheckboxes({
  legend,
  options,
  selected,
  onToggle,
}: {
  legend: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="label-lux">{legend}</legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <label
              key={option}
              className={`cursor-pointer border px-4 py-2.5 text-[0.78rem] transition-all duration-300 ${
                active
                  ? "border-champagne bg-champagne/10 text-navy"
                  : "border-navy/15 bg-white/50 text-charcoal/70 hover:border-champagne/60"
              }`}
            >
              <input
                type="checkbox"
                name="services"
                value={option}
                checked={active}
                onChange={() => onToggle(option)}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
