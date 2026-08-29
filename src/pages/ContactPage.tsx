import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Mail, Phone, MapPin, Printer, ArrowRight, Check } from "lucide-react";
import { company } from "@/data/site";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import factoryImage from "@/assets/factory-floor.jpg";
import { toast } from "sonner";

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const defaultIntent = searchParams.get("intent") || "general";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    purpose: defaultIntent === "quote" ? "quote" : "general",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you! Your message has been sent successfully.");
  };

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        lead="Contact our sales and engineering team for custom wire harness quoting, material availability, or general enquiries."
        image={factoryImage}
      />

      <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <Reveal>
              <p className="label-tech text-muted-foreground">Office & Plant</p>
              <h2 className="mt-4 text-3xl font-extrabold text-foreground lg:text-4xl">Qualitech headquarters</h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Our administrative office and manufacturing floor are co-located in Hyderabad. Stop by or reach out through email or phone.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex gap-4">
                  <div className="rounded-xl bg-platinum p-3 text-graphite shrink-0">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Address</h3>
                    <address className="mt-1 text-sm not-italic leading-relaxed text-muted-foreground">
                      {company.address.map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </address>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-xl bg-platinum p-3 text-graphite shrink-0">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Phone</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <a href={`tel:${company.phone}`} className="hover:text-foreground">
                        {company.phone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-xl bg-platinum p-3 text-graphite shrink-0">
                    <Printer className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Fax</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{company.fax}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-xl bg-platinum p-3 text-graphite shrink-0">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Email</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <a href={`mailto:${company.email}`} className="hover:text-foreground">
                        {company.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-12 border-t border-border pt-8 text-xs text-muted-foreground">
              <p>Registered Office: LIG B-279, Dr. A S Rao Nagar, ECIL Post, Hyderabad.</p>
              <p className="mt-1">Business Hours: Monday – Saturday, 9:00 AM – 6:00 PM IST.</p>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal className="h-full rounded-xl border border-border bg-card p-8 lg:p-10">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-16">
                  <div className="rounded-full bg-emerald-100 p-4 text-emerald-600">
                    <Check className="size-8" />
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold text-foreground">Message Sent</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Thank you for reaching out to Qualitech Connectronics. Our engineering and quote team will review your specifications or message and reply within 1–2 business days.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        companyName: "",
                        purpose: "general",
                        message: "",
                      });
                    }}
                    className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-graphite px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-steel"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Contact Form</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Submit details below, and we will get back to you shortly.
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-foreground">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-graphite focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-foreground">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-graphite focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-foreground">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-graphite focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="companyName" className="block text-xs font-bold uppercase tracking-wider text-foreground">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-graphite focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground">
                      Form Purpose
                    </label>
                    <div className="mt-3 flex gap-6">
                      <label className="flex items-center gap-2.5 text-sm font-semibold text-foreground cursor-pointer">
                        <input
                          type="radio"
                          name="purpose"
                          value="general"
                          checked={form.purpose === "general"}
                          onChange={() => setForm({ ...form, purpose: "general" })}
                          className="size-4 accent-graphite"
                        />
                        General Enquiry
                      </label>
                      <label className="flex items-center gap-2.5 text-sm font-semibold text-foreground cursor-pointer">
                        <input
                          type="radio"
                          name="purpose"
                          value="quote"
                          checked={form.purpose === "quote"}
                          onChange={() => setForm({ ...form, purpose: "quote" })}
                          className="size-4 accent-graphite"
                        />
                        Request a Quote (RFQ)
                      </label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-foreground">
                      Message / Specifications *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder={form.purpose === "quote" ? "Include connector part numbers, target quantities, and any drawings link or descriptions of routing lines." : "Let us know your requirements..."}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-border bg-background p-4 text-sm text-foreground focus:border-graphite focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-12 items-center gap-2 rounded-xl bg-graphite px-8 text-sm font-semibold text-primary-foreground transition-colors hover:bg-steel"
                  >
                    Submit Form <ArrowRight className="size-4" />
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
