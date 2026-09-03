import { useState } from "react";
import Reveal from "./Reveal";
import GlowOrb from "./Gloworb";
import SectionNumber from "./Sectionnumber";

// Inline icons — no external icon package required.
function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21s7-6.1 7-11.5a7 7 0 1 0-14 0C5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.92.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M17.47 14.38c-.28-.14-1.67-.82-1.93-.92-.26-.1-.45-.14-.64.14-.19.28-.74.92-.9 1.1-.17.19-.33.21-.61.07-.28-.14-1.18-.44-2.24-1.4-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.64-1.56-.88-2.14-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.42 0 1.43 1.03 2.81 1.17 3 .14.19 2.03 3.16 4.94 4.31.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.67-.68 1.91-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.54-.33Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2a10 10 0 0 0-8.5 15.24L2 22l4.9-1.44A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.4 15.1l-.32-.2-2.9.85.86-2.83-.21-.33A8.2 8.2 0 0 1 12 3.8Z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIALS = [
  { label: "WhatsApp", href: "https://wa.me/234XXXXXXXXXX", Icon: WhatsappIcon },
  { label: "GitHub", href: "https://github.com/", Icon: GithubIcon },
  { label: "Instagram", href: "https://instagram.com/", Icon: InstagramIcon },
];

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Fill in every field before sending.");
      return;
    }
    setError("");
    setStatus("sending");

    // A plain frontend can't send email on its own — wire this up to
    // a service like Formspree, EmailJS, or your own API route, then
    // swap this timeout for the real request.
    setTimeout(() => {
      setStatus("sent");
      setForm(initialForm);
    }, 900);
  };

  return (
    <section
      id="contact"
      className="bg-grid relative overflow-hidden bg-[var(--bg-primary)] px-4 py-24 md:px-8"
    >
      <SectionNumber value="04" className="right-6 bottom-6 md:right-10 md:bottom-10" />
      <GlowOrb
        color="rgba(129, 140, 248, 0.15)"
        className="-bottom-24 -right-24"
      />

      <div className="relative mx-auto grid max-w-5xl gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-10">
        {/* Left: intro + contact details */}
        <Reveal>
          <h2 className="font-['Space_Grotesk'] text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-4xl">
            Have a project in mind?
            <br />
            Let's talk about it.
          </h2>
          <p className="mt-4 max-w-sm text-[var(--text-secondary)]">
            Send a few details about what you're building and I'll get back
            to you within a couple of days.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="mailto:dominion@example.com"
              className="flex items-center gap-3 text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-primary)]"
            >
              <MailIcon className="shrink-0" />
              dominion@example.com
            </a>
            <span className="flex items-center gap-3 text-[var(--text-secondary)]">
              <PinIcon className="shrink-0" />
              Lagos, Nigeria
            </span>
          </div>

          <div className="mt-8 flex gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
              >
                <Icon />
              </a>
            ))}
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal delay={120}>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface-card)] p-6 md:p-8"
          >
            <div className="flex flex-col gap-5">
              <Field
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
              />
              <Field
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What are you building?"
                textarea
              />

              {error && (
                <p className="text-sm text-[var(--accent-secondary)]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-1 rounded-lg bg-[var(--accent-primary)] px-5 py-3 text-sm font-medium text-[var(--bg-primary)] transition-all duration-200 hover:scale-[1.02] hover:bg-[var(--accent-secondary)] disabled:scale-100 disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>

              {status === "sent" && (
                <p className="text-sm text-[var(--accent-primary)]">
                  Message sent. I'll reply soon.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, placeholder, type = "text", textarea = false }) {
  const baseClasses =
    "w-full rounded-lg border border-[var(--border-color)] bg-[var(--code-bg)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-colors focus:border-[var(--accent-primary)]";

  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-xs tracking-wide text-[var(--text-secondary)]">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}
    </label>
  );
}