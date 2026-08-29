import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  Cable,
  Factory,
  Plug,
  ShieldCheck,
  Award,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  ChevronDown,
  Quote,
  FileCode,
  Check
} from "lucide-react";
import hero from "@/assets/hero-harness.jpg";
import factory from "@/assets/factory-floor.jpg";
import cableAssemblies from "@/assets/cable-assemblies.jpg";
import connectors from "@/assets/connectors.jpg";
import telecom from "@/assets/ind-telecom.jpg";
import power from "@/assets/ind-power.jpg";
import defense from "@/assets/ind-defense.jpg";
import railways from "@/assets/ind-railways.jpg";
import { Counter, Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { categories } from "@/data/products";
import { company, industries, stats, whyQualitech } from "@/data/site";
import { useProducts } from "@/lib/store";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Cable,
    title: "Cable Assemblies",
    body: "Custom harnesses and assemblies built to customer drawings, with sleeving, labelling and full termination.",
    image: cableAssemblies,
    to: "/solutions" as const,
  },
  {
    icon: Plug,
    title: "Connectors",
    body: "DSUB, DIN (EURO), IDC (FRC), HARTING series and allied components supplied from stock or to order.",
    image: connectors,
    to: "/products" as const,
  },
  {
    icon: Factory,
    title: "Facilities",
    body: "In-house tooling, crimping, termination and inspection processes for consistent, repeatable builds.",
    image: factory,
    to: "/facilities" as const,
  },
];

const industryImages: Record<string, string> = {
  communications: telecom,
  automotive: power,
  industrial: factory,
  telecommunications: telecom,
  power,
  defense,
  railways,
};

const processSteps = [
  {
    step: "01",
    title: "Drawing & Specs Ingestion",
    desc: "We review your mechanical/electrical schematic, BOM part numbers, routing dimensions, and tolerance requirements.",
    icon: FileCode,
  },
  {
    step: "02",
    title: "Precision Cutting & Prep",
    desc: "Automated wire cutting, stripping, and thermal jacket preparation to exact mm tolerances.",
    icon: Zap,
  },
  {
    step: "03",
    title: "Dedicated Board Looming",
    desc: "1:1 scaled jig layout boards guide multi-branch routing, bundle strapping, and heat shrink sleeves.",
    icon: Layers,
  },
  {
    step: "04",
    title: "Calibrated Crimp & Terminate",
    desc: "Certified crimp tooling, IDC ribbon presses, and precision solder joints tailored to terminal specs.",
    icon: Cpu,
  },
  {
    step: "05",
    title: "100% Computerized Testing",
    desc: "Full automated circuit continuity, pin-out verification, Hi-Pot insulation, and pull-force checks.",
    icon: ShieldCheck,
  },
  {
    step: "06",
    title: "Labelling & Secure Pack",
    desc: "Laser/thermal wire markers applied, protective bagging, and scheduled OEM delivery with batch reports.",
    icon: CheckCircle2,
  },
];

const qualityHighlights = [
  {
    title: "IPC/WHMA-A-620 Standards",
    desc: "Workmanship adherence to international standards for cable and wire harness assemblies.",
    icon: Award,
  },
  {
    title: "100% Continuity & Pin-out",
    desc: "Automated test fixtures prevent swapped pins, dry joints, and open circuits before packing.",
    icon: ShieldCheck,
  },
  {
    title: "Tensile Pull-Force Audits",
    desc: "Regular calibrated pull-test calibration on all crimp terminals for high-vibration resilience.",
    icon: Zap,
  },
  {
    title: "RoHS & REACH Compliant",
    desc: "Materials sourced and documented according to environmentally conscious OEM requirements.",
    icon: Check,
  },
];

const testimonials = [
  {
    quote: "Qualitech's custom multi-branch harnesses matched our telecom rack drawings with zero pin-out defects across 5,000+ units.",
    author: "Senior Systems Engineer",
    company: "Telecom Infrastructure OEM",
    location: "Bangalore",
  },
  {
    quote: "Exceptional turnaround on urgent DIN & Euro connector harness batches. Their in-house tooling cut our prototype lead time in half.",
    author: "Production Head",
    company: "Industrial Control Systems",
    location: "Hyderabad",
  },
  {
    quote: "Reliable OEM supplier since over a decade. Consistent crimp quality and prompt technical response on custom drawing changes.",
    author: "Head of Procurement",
    company: "Power & Automation Solutions",
    location: "Chennai",
  },
];

const faqs = [
  {
    q: "What drawing or file formats do you accept for quoting wire harnesses?",
    a: "We accept PDF schematics, DWG/DXF CAD drawings, Excel BOMs with connector part numbers, or physical harness samples. If you have only rough sketches, our engineering team can assist in documenting the pin-out.",
  },
  {
    q: "What is your typical turnaround time for custom harness prototypes and volume runs?",
    a: "Standard prototype samples with in-stock components are delivered within 3–7 business days. Batch production runs depend on volume and connector lead times, typically ranging from 2 to 4 weeks.",
  },
  {
    q: "Do you supply connectors and allied components separately from cable assemblies?",
    a: "Yes. In addition to custom assembled harnesses, we stock and distribute individual DSUB, DIN (Euro), IDC (FRC), and HARTING series connectors and hoods.",
  },
  {
    q: "How do you test and verify harness reliability before dispatch?",
    a: "Every harness undergoes 100% electrical continuity and shorts testing on automated test benches. We also perform visual inspection against drawing dimensions and mechanical crimp pull-force audits.",
  },
  {
    q: "What is your Minimum Order Quantity (MOQ)?",
    a: "We accommodate both low-volume prototype builds for R&D trials as well as ongoing high-volume monthly production contracts for OEMs.",
  },
];

export default function Home() {
  const { products } = useProducts();
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Cinematic Glow and Ambient Lighting */}
      <section className="brushed relative overflow-hidden pt-28 sm:pt-36 lg:pt-44 pb-24 lg:pb-32">
        {/* Ambient background light orbs */}
        <div className="cinematic-orb pointer-events-none absolute -left-20 top-1/4 size-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="cinematic-orb-alt pointer-events-none absolute right-0 top-1/3 size-[30rem] rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 bottom-10 size-72 rounded-full bg-brand-blue/20 blur-2xl" />

        {/* Hero background image */}
        <img
          src={hero}
          alt="Precision wire harness manufacturing"
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover opacity-25 grayscale mix-blend-luminosity transform scale-105 transition-transform duration-1000 ease-out"
        />

        <div className="tech-grid relative z-10">
          <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-12 lg:grid-cols-12 lg:px-10 lg:py-20">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md shadow-lg shadow-black/10">
                  <span className="size-2 rounded-full bg-brand-yellow animate-pulse" />
                  <span className="label-tech text-white text-[11px] tracking-widest">
                    Established {company.established} · Hyderabad, India
                  </span>
                </div>
                
                <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl tracking-tight">
                  Precision <span className="shimmer-text">Wire Harnesses</span> & Interconnect for OEMs
                </h1>
                
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 lg:text-lg">
                  Qualitech Connectronics designs and manufactures custom-built wire and cable
                  harnesses, and supplies connectors and allied components — engineered around each
                  customer's application.
                </p>
                
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    to="/products"
                    className="inline-flex h-13 items-center gap-2 rounded-2xl bg-white px-8 text-sm font-bold text-graphite shadow-xl transition-all duration-300 hover:bg-chrome hover:shadow-2xl hover:scale-105 active:scale-95"
                  >
                    <span>Browse Catalogue</span>
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/contact?intent=quote"
                    className="inline-flex h-13 items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/25 hover:border-white/50 hover:scale-105 active:scale-95 shadow-lg"
                  >
                    Request a Quote
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:pl-8 flex flex-col justify-center">
              <Reveal delay={140} className="grid gap-4 overflow-hidden sm:grid-cols-2">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="group rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl shadow-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-white/30"
                  >
                    <p className="text-3xl lg:text-4xl font-extrabold text-white group-hover:text-brand-yellow transition-colors">
                      <Counter value={s.value} suffix={s.suffix} literal={"literal" in s ? s.literal : undefined} />
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-white/65">{s.label}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
        
        {/* Animated cinematic signal line */}
        <span className="signal-line absolute bottom-0 left-0 h-[2px] w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
      </section>

      {/* Credibility strip with subtle glass backdrop */}
      <section className="border-b border-border bg-platinum/60 backdrop-blur-sm relative z-20">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-10 gap-y-4 px-5 py-6 lg:px-10">
          <p className="label-tech text-muted-foreground">Trusted Across Sectors</p>
          {industries.map((i) => (
            <span
              key={i.slug}
              className="inline-flex items-center gap-2 text-sm font-bold text-foreground transition-all duration-300 hover:text-brand-blue hover:scale-105"
            >
              <span className="size-1.5 rounded-full bg-brand-blue" />
              {i.name}
            </span>
          ))}
          <p className="ml-auto flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <ShieldCheck className="size-4 text-brand-blue" /> OEM-focused since {company.established}
          </p>
        </div>
      </section>

      {/* About Section with Cinematic Card Lift */}
      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
        <Reveal className="relative group">
          <div className="overflow-hidden rounded-3xl border border-border shadow-xl">
            <img
              src={factory}
              alt="Harness assembly and termination work in progress"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
          <div className="absolute -bottom-6 right-6 hidden rounded-2xl bg-graphite/95 p-6 text-white shadow-2xl backdrop-blur-xl sm:block border border-white/20 transition-transform duration-500 group-hover:-translate-y-2">
            <p className="text-3xl font-extrabold text-white">30+</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-white/70">Years in Operation</p>
          </div>
        </Reveal>
        <Reveal delay={120} className="flex flex-col justify-center">
          <p className="label-tech text-brand-blue font-bold">Who We Are</p>
          <h2 className="mt-4 text-3xl font-extrabold text-foreground lg:text-4xl leading-tight">
            A harness manufacturer built around engineering discipline
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Established in 1995 by a team of dedicated professionals, Qualitech has grown into a
            trusted provider of high quality custom built wire and cable harnesses to OEMs — combining
            experienced manpower with current process technology.
          </p>
          <div className="mt-8 grid gap-4 overflow-hidden rounded-2xl sm:grid-cols-2">
            {whyQualitech.slice(0, 4).map((w) => (
              <div
                key={w.title}
                className="rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-brand-blue/40 hover:shadow-lg hover:-translate-y-1"
              >
                <h3 className="text-sm font-bold text-foreground">{w.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{w.body}</p>
              </div>
            ))}
          </div>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-brand-blue underline-offset-4 hover:underline"
          >
            More about Qualitech <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>

      {/* Services / Capabilities Section */}
      <section className="border-y border-border bg-platinum/50 relative">
        <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <p className="label-tech text-brand-blue font-bold">Capabilities</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-extrabold text-foreground lg:text-4xl">
              Interconnect solutions, end to end
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 110}>
                <Link
                  to={s.to}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-brand-blue/40"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-platinum relative">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="size-full object-cover grayscale transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="size-12 rounded-xl bg-platinum flex items-center justify-center text-foreground transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white group-hover:scale-110">
                      <s.icon className="size-6" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-foreground transition-colors group-hover:text-brand-blue">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-foreground group-hover:text-brand-blue">
                      Explore Details <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Structured 6-Stage Process Flow */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="label-tech text-brand-blue font-bold">Structured Execution</p>
          <h2 className="mt-4 text-3xl font-extrabold text-foreground lg:text-4xl">
            Our 6-Stage Manufacturing & Quality Flow
          </h2>
          <p className="mt-4 text-muted-foreground text-sm lg:text-base">
            From initial CAD schematics to final batch testing, every step follows repeatable tooling procedures to eliminate assembly variance.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, idx) => (
            <Reveal key={step.step} delay={idx * 80}>
              <div className="h-full rounded-2xl border border-border bg-card p-7 transition-all duration-500 hover:border-brand-blue/40 hover:shadow-xl hover:-translate-y-2 group">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-brand-blue/30 group-hover:text-brand-blue transition-colors">
                    {step.step}
                  </span>
                  <div className="size-11 rounded-xl bg-platinum flex items-center justify-center text-foreground group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 group-hover:rotate-6">
                    <step.icon className="size-5" />
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground group-hover:text-brand-blue transition-colors">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="border-t border-border bg-platinum/40">
        <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label-tech text-brand-blue font-bold">Catalogue</p>
              <h2 className="mt-4 text-3xl font-extrabold text-foreground lg:text-4xl">Featured Products</h2>
            </div>
            <Link
              to="/products"
              className="inline-flex h-11 items-center gap-2 rounded-2xl border border-border bg-card px-6 text-sm font-bold text-foreground transition-all duration-300 hover:bg-brand-blue hover:text-white hover:shadow-lg"
            >
              <span>View All Products</span>
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance & Zero-Defect Standards */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="rounded-3xl border border-border bg-card p-8 lg:p-14 shadow-panel relative overflow-hidden">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <Reveal className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3.5 py-1 text-xs font-bold text-brand-blue">
                <ShieldCheck className="size-4" /> Zero-Defect Philosophy
              </div>
              <h2 className="mt-4 text-3xl font-extrabold text-foreground lg:text-4xl leading-tight">
                Engineered for harsh operating environments
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                We implement calibrated crimp verification, Hi-Pot insulation resistance testing, and dimensional inspection on every single assembly batch.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Link
                  to="/facilities"
                  className="inline-flex h-12 items-center gap-2 rounded-2xl bg-graphite px-7 text-sm font-bold text-primary-foreground transition-all duration-300 hover:bg-brand-blue hover:shadow-xl hover:scale-105"
                >
                  Explore Testing Facilities <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>

            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {qualityHighlights.map((q, idx) => (
                <Reveal key={q.title} delay={idx * 70}>
                  <div className="rounded-2xl border border-border/80 bg-background/60 p-6 transition-all duration-300 hover:border-brand-blue/40 hover:shadow-xl hover:-translate-y-1">
                    <div className="size-11 rounded-xl bg-platinum flex items-center justify-center text-brand-blue mb-4 shadow-xs">
                      <q.icon className="size-5" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">{q.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{q.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section with Cinematic Backing */}
      <section className="brushed text-white relative overflow-hidden">
        <div className="cinematic-orb pointer-events-none absolute right-10 top-1/2 size-96 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="tech-grid relative z-10">
          <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
            <Reveal>
              <p className="label-tech text-white/60">Industries Served</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-extrabold text-white lg:text-4xl">
                Application-specific supply across critical sectors
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((ind, i) => (
                <Reveal key={ind.slug} delay={i * 90} className="group relative overflow-hidden rounded-3xl bg-graphite/90 border border-white/15 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/30">
                  <img
                    src={industryImages[ind.slug]}
                    alt={ind.name}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover opacity-25 grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-40"
                  />
                  <div className="relative flex h-full min-h-72 flex-col justify-end p-7">
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-yellow transition-colors">{ind.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{ind.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer / OEM Testimonials */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="label-tech text-brand-blue font-bold">Partner Feedback</p>
          <h2 className="mt-4 text-3xl font-extrabold text-foreground lg:text-4xl">
            Trusted by OEM Engineering Teams
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <Reveal key={t.author} delay={idx * 90}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-xs transition-all duration-500 hover:shadow-2xl hover:border-brand-blue/40 hover:-translate-y-2">
                <div>
                  <Quote className="size-8 text-brand-blue/20 mb-4" />
                  <p className="text-sm leading-relaxed text-foreground font-medium italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-sm font-bold text-foreground">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.company} · {t.location}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="border-t border-border bg-platinum/40">
        <div className="mx-auto max-w-[1000px] px-5 py-20 lg:px-10 lg:py-28">
          <Reveal className="text-center">
            <p className="label-tech text-brand-blue font-bold">Frequently Asked Questions</p>
            <h2 className="mt-4 text-3xl font-extrabold text-foreground lg:text-4xl">
              Engineering & Quoting FAQs
            </h2>
          </Reveal>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, idx) => (
              <Reveal key={faq.q} delay={idx * 60}>
                <div className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-brand-blue/30 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between p-6 text-left text-base font-bold text-foreground transition-colors hover:text-brand-blue"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        "size-5 text-muted-foreground transition-transform duration-300 shrink-0 ml-4",
                        openFaq === idx && "rotate-180 text-brand-blue"
                      )}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6 pt-0 text-sm leading-relaxed text-muted-foreground border-t border-border/40 mt-1 pt-4 animate-in fade-in duration-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-24">
        <Reveal className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-border bg-card p-10 lg:flex-row lg:items-center lg:p-14 shadow-panel transition-all hover:shadow-2xl">
          <div>
            <span className="label-tech text-brand-blue font-bold">Fast Turnaround RFQ</span>
            <h2 className="mt-2 text-3xl font-extrabold text-foreground">Have a drawing or part list to quote?</h2>
            <p className="mt-3 max-w-xl text-muted-foreground text-sm leading-relaxed">
              Share your harness drawing, connector part numbers, or application specs. Our engineering desk will revert with availability and pricing within 24–48 hours.
            </p>
          </div>
          <Link
            to="/contact?intent=quote"
            className="inline-flex h-13 shrink-0 items-center gap-2 rounded-2xl bg-graphite px-8 text-sm font-bold text-primary-foreground transition-all duration-300 hover:bg-brand-blue hover:shadow-2xl hover:shadow-brand-blue/30 hover:scale-105 active:scale-95"
          >
            <span>Request a Quote Now</span>
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
