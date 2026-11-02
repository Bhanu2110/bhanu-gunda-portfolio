import { useState, type FormEvent } from "react";

// Replace with your Google Apps Script Web App URL
// Follow the instructions in GOOGLE_SHEETS_SETUP.md to generate this URL in 2 minutes
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyGFxugepuZCbcMEHHyPVXzkxLeeVo_HwN-DAXPMTYwmGzmuSKvGnLRWU6FmySudmbI/exec";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setStatus("submitting");

    if (GOOGLE_SCRIPT_URL) {
      try {
        const bodyData = new URLSearchParams();
        bodyData.append("name", formData.name.trim());
        bodyData.append("email", formData.email.trim());
        bodyData.append("phone", formData.phone.trim() || "N/A");
        bodyData.append("message", formData.message.trim());
        bodyData.append("date", new Date().toLocaleString());

        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: bodyData.toString(),
        });

        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        return;
      } catch (err) {
        console.error("Failed to submit to Google Sheet:", err);
      }
    }

    // Fallback: If URL not configured yet or network fails, open mailto directly
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "Not provided"}\n\nMessage:\n${formData.message}`
    );

    setTimeout(() => {
      window.location.href = `mailto:gundabhanu10@gmail.com?subject=${subject}&body=${body}`;
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 400);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
      <h3 className="font-display text-xl font-semibold text-foreground">Send a Message</h3>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="contact-name" className="sr-only">
            Your Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your Name"
            className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="sr-only">
            Your Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Your Email"
            className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="sr-only">
            Your Contact Number (optional)
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Your Contact Number (optional)"
            className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="sr-only">
            Your Message
          </label>
          <textarea
            id="contact-message"
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Your Message"
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-2 w-full rounded-xl bg-primary py-3.5 text-center text-sm font-bold tracking-wider uppercase text-primary-foreground transition-all duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-[0.99] disabled:opacity-70 cursor-pointer"
        >
          {status === "submitting" ? "SENDING..." : "SEND MESSAGE"}
        </button>

        {status === "success" && (
          <p className="text-center text-sm text-primary font-medium mt-1">
            Thank you! Your message has been sent successfully.
          </p>
        )}
      </form>
    </div>
  );
}
