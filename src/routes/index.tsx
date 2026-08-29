import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cable, Factory, Plug, ShieldCheck } from "lucide-react";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Qualitech Connectronics — Custom Wire Harnesses for OEMs" },
      {
        name: "description",
        content:
          "Since 1995, Qualitech Connectronics builds custom wire harnesses, cable assemblies and connector solutions for telecom, power, defense and railway OEMs.",
      },
      { property: "og:title", content: "Qualitech Connectronics — Custom Wire Harnesses for OEMs" },
      {
        property: "og:description",
        content: "Custom-built wire harnesses, cable assemblies and connectors for OEMs since 1995.",
      },
    ],
  }),
  component: Home,
});

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
  telecommunications: telecom,
  power,
  defense,
  railways,
};

function Home() {
  const { products } = useProducts();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="brushed relative overflow-hidden">
        <img
          src={hero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover opacity-30 grayscale"
        />
        <div className="tech-grid relative">
          <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-24 lg:grid-cols-12 lg:px-10 lg:py-32">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="label-tech text-white/50">Established {company.established} · Hyderabad, India</p>
                <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                  Precision wire harnesses and interconnect for demanding OEMs
                </h1>
                <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70 lg:text-lg">
                  Qualitech Connectronics designs and manufactures custom-built wire and cable
                  harnesses, and supplies connectors and allied components — engineered around each
                  customer's application.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    to="/products"
                    className="inline-flex h-12 items-center gap-2 rounded-sm bg-white px-6 text-sm font-semibold text-graphite transition-colors hover:bg-chrome"
                  >
                    Browse catalogue <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    to="/contact"
                    search={{ intent: "quote" }}
                    className="inline-flex h-12 items-center rounded-sm border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Request a quote
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:pl-8">
              <Reveal delay={140} className="grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2">
                {stats.map((s) => (
                  <div key={s.label} className="bg-graphite/70 p-6 backdrop-blur-sm">
                    <p className="text-3xl font-extrabold text-white">
                      <Counter value={s.value} suffix={s.suffix} literal={"literal" in s ? s.literal : undefined} />
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-widest text-white/50">{s.label}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
        <span className="signal-line absolute bottom-0 left-0 h-px w-1/3 bg-white/60" />
      </section>

      {/* Credibility strip */}
      <section className="border-b border-border bg-platinum">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-10 gap-y-4 px-5 py-6 lg:px-10">
          <p className="label-tech text-muted-foreground">Trusted across</p>
          {industries.map((i) => (
            <p key={i.slug} className="text-sm font-semibold text-foreground">
              {i.name}
            </p>
          ))}
          <p className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4" /> OEM-focused since {company.established}
          </p>
        </div>
      </section>

      {/* About split */}
      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
        <Reveal className="relative">
          <img
            src={factory}
            alt="Harness assembly and termination work in progress"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-sm object-cover grayscale"
          />
          <div className="absolute -bottom-6 right-6 hidden bg-graphite px-8 py-6 text-white sm:block">
            <p className="text-3xl font-extrabold">30+</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-white/60">Years in operation</p>
          </div>
        </Reveal>
        <Reveal delay={120} className="flex flex-col justify-center">
          <p className="label-tech text-muted-foreground">Who we are</p>
          <h2 className="mt-4 text-3xl font-extrabold text-foreground lg:text-4xl">
            A harness manufacturer built around engineering discipline
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Established in 1995 by a team of dedicated professionals, Qualitech has grown into a
            trusted provider of high quality custom built wire and cable harnesses to OEMs — combining
            experienced manpower with current process technology.
          </p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2">
            {whyQualitech.slice(0, 4).map((w) => (
              <div key={w.title} className="bg-card p-5">
                <h3 className="text-sm font-bold text-foreground">{w.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{w.body}</p>
              </div>
            ))}
          </div>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
          >
            More about Qualitech <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>

      {/* Services */}
      <section className="border-y border-border bg-platinum">
        <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <p className="label-tech text-muted-foreground">Capabilities</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-extrabold text-foreground lg:text-4xl">
              Interconnect solutions, end to end
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 110}>
                <Link
                  to={s.to}
                  className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="size-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <s.icon className="size-6 text-foreground" />
                    <h3 className="mt-4 text-lg font-bold text-foreground">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                      Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label-tech text-muted-foreground">Catalogue</p>
            <h2 className="mt-4 text-3xl font-extrabold text-foreground lg:text-4xl">Featured products</h2>
          </div>
          <Link
            to="/products"
            className="inline-flex h-11 items-center gap-2 rounded-sm border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            View all products <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="brushed">
        <div className="tech-grid">
          <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
            <Reveal>
              <p className="label-tech text-white/50">Industries served</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-extrabold text-white lg:text-4xl">
                Application-specific supply across critical sectors
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((ind, i) => (
                <Reveal key={ind.slug} delay={i * 90} className="group relative overflow-hidden bg-graphite">
                  <img
                    src={industryImages[ind.slug]}
                    alt={ind.name}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover opacity-25 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-40"
                  />
                  <div className="relative flex h-full min-h-64 flex-col justify-end p-6">
                    <h3 className="text-lg font-bold text-white">{ind.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{ind.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category showcase */}
      <section className="overflow-hidden border-b border-border bg-platinum py-10">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-3 px-5 lg:px-10">
          {categories.map((c) => (
            <Link
              key={c}
              to="/products"
              search={{ category: c }}
              className="rounded-sm border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-24">
        <Reveal className="flex flex-col items-start justify-between gap-8 rounded-sm border border-border bg-card p-10 lg:flex-row lg:items-center lg:p-14">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground">Have a drawing to quote?</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Share your harness drawing, connector part numbers or application details and our team
              will revert with availability and pricing.
            </p>
          </div>
          <Link
            to="/contact"
            search={{ intent: "quote" }}
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-sm bg-graphite px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-steel"
          >
            Talk to our team <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
