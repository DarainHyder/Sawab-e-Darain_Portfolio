import { useState, type FormEvent, type MouseEvent } from "react";
import emailjs from "@emailjs/browser";
import { LINKS } from "./data";
import { Out, Section } from "./Section";
import { useGo } from "./Transition";
import { useResume } from "./Resume";

const FIELDS = [
  { key: "name", label: "name", placeholder: "your name", type: "text" },
  { key: "email", label: "email", placeholder: "you@domain.com", type: "email" },
  { key: "subject", label: "subject", placeholder: "what's this about?", type: "text" },
] as const;

type Status = { kind: "idle" | "sending" | "ok" | "err"; msg?: string };

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (Object.values(form).some((v) => !v.trim())) {
      setStatus({ kind: "err", msg: "error: all fields are required" });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      await emailjs.send(
        "service_lr5r3g9",
        "template_25tfbra",
        { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message, to_email: LINKS.email },
        "qAZh3k0bi8Yrl0SJd"
      );
      setStatus({ kind: "ok", msg: "✓ message delivered. i'll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      setStatus({ kind: "err", msg: `✗ send failed. try again or mail ${LINKS.email}` });
    }
  };

  const showResume = useResume();
  const links: [string, string, string][] = [
    ["email", LINKS.email, `mailto:${LINKS.email}`],
    ["phone", LINKS.phone, `tel:${LINKS.phone}`],
    ["github", "github.com/DarainHyder", LINKS.github],
    ["linkedin", "in/syed-darain-hyder-kazmi", LINKS.linkedin],
  ];

  return (
    <Section id="contact" index="07" cmd="./send_message.sh" title="contact" ext=".sh">
      <div className="t-contact">
        <form className="t-form" onSubmit={submit} noValidate>
          <Out i={0} className="t-dim t-form-intro">
            Open to roles, freelance work and interesting problems. Send a message below.
          </Out>
          {FIELDS.map((f, i) => (
            <Out key={f.key} i={i + 1} className="t-field">
              <label htmlFor={`c-${f.key}`}>
                <span className="t-acc">?</span> {f.label}
              </label>
              <span className="t-dim">›</span>
              <input
                id={`c-${f.key}`}
                type={f.type}
                value={form[f.key]}
                onChange={set(f.key)}
                placeholder={f.placeholder}
                autoComplete={f.key === "subject" ? "off" : f.key}
              />
            </Out>
          ))}
          <Out i={4} className="t-field is-area">
            <label htmlFor="c-message">
              <span className="t-acc">?</span> message
            </label>
            <span className="t-dim">›</span>
            <textarea id="c-message" rows={4} value={form.message} onChange={set("message")} placeholder="tell me about your project…" />
          </Out>
          <Out i={5} className="t-form-foot">
            <button type="submit" className="t-btn is-primary" disabled={status.kind === "sending"}>
              {status.kind === "sending" ? "sending…" : "send ↵"}
            </button>
            {status.msg && <span className={status.kind === "ok" ? "t-ok" : "t-err"}>{status.msg}</span>}
          </Out>
        </form>

        <div className="t-contact-side">
          <Out i={1} className="t-faint t-small">
            # or reach me directly
          </Out>
          {links.map(([k, v, href], i) => (
            <Out key={k} i={i + 2} className="t-kv">
              <span className="t-dim">{k}</span>
              <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="t-link">
                {v}
              </a>
            </Out>
          ))}
          <Out i={7} className="t-kv">
            <span className="t-dim">resume</span>
            <button onClick={showResume} className="t-link t-left">
              resume.pdf
            </button>
          </Out>
          <Out i={8} className="t-kv">
            <span className="t-dim">location</span>
            <span>{LINKS.location}</span>
          </Out>
        </div>
      </div>
    </Section>
  );
}

export function Footer() {
  const go = useGo();
  return (
    <footer className="t-footer">
      <div className="t-footer-inner">
        <div>
          <span className="t-path">~/darain</span>
          <span className="t-acc"> $ </span>exit
        </div>
        <div className="t-dim" suppressHydrationWarning>
          logout · session closed · © {new Date().getFullYear()} Darain Hyder
        </div>
        <button className="t-link" onClick={(e: MouseEvent) => go("top", { x: e.clientX, y: e.clientY })}>
          ↑ back to top
        </button>
      </div>
    </footer>
  );
}
