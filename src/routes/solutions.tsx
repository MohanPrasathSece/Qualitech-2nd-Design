import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cable, Layers, Plug, Ruler, Scissors, Wrench } from "lucide-react";
import cableAssemblies from "@/assets/cable-assemblies.jpg";
import connectors from "@/assets/connectors.jpg";
import hero from "@/assets/hero-harness.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { categories } from "@/data/products";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — Wire Harnesses, Cable Assemblies & Connectors" },
      {
        name: "description",
        content:
          "Custom wire harnesses, ribbon and circular cable assemblies, and connector supply across DSUB, DIN (EURO), IDC (FRC) and HARTING series.",
      },
      { property: "og:title", content: "Qualitech Solutions — Harnesses, Assemblies, Connectors" },
      {
        property: "og:description",
        content: "Application-specific interconnect solutions built to customer drawings.",
      },
    ],
  }),
  component: Solutions;
});

const blocks = [
  {
    icon: Cable,
    title: "Custom Wire Harnesses",
    image: hero,
    body: "Single and multi-branch harnesses manufactured to customer drawings, including sleeving, taping, labelling and specified marking.",
    points: ["Built to drawing", "Multi-branch routing", "Sleeving & strain relief", "Marking and labelling"],
  },
  {
    icon: Layers,
    title: "Cable Assemblies",
    image: cableAssemblies,
    body: "Ribbon, screened and circular connector assemblies terminated to customer length and pin-out on consistent tooling.",
    points: ["IDC / FRC ribbon assemblies", "Braided screening", "Circular connector assemblies", "Customer-specified lengths"],
  },
  {
    icon: Plug,
    title: "Connectors & Components",
    image: connectors,
    body: "Connector ranges and allied items supplied loose or terminated, from stock where available and against part number otherwise.",
    points: ["DSUB and accessories", "DIN (EURO) / HARTING", "IDC (FRC) series", "Terminals & housings"],
  },
];

const process = [
  { icon: Ruler, title: "Requirement", body: "We review your drawing, part numbers or application brief." },
  { icon: Scissors, title: "Preparation", body: "Cable cutting, stripping and pre-termination preparation." },
  { icon: Wrench, title: "Termination", body: "Crimping, soldering and IDC termination on dedicated tooling." },
  { icon: Layers, title: "Check & Dispatch", body: "Continuity and workmanship checks before packing and supply." },
];

function Solutions() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Solutions"
        lead="Interconnect designed around your application — from a single connector to a complete harness build."
        image={cableAssemblies}
      />

      <section className="mx-auto max-w-[1400px] space-y-px px-5 py-20 lg:px-10 lg:py-28">
        {blocks.map((b, i) => (
          <Reveal key={b.title}>
            <div
              className={`grid items-center gap-10 border border-border bg-card p-6 lg:grid-cols-2 lg:p-10 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <img
                src={b.image}
                alt={b.title}
                loading="lazy"
                className="aspect-[16/10] w-full rounded-sm object-cover grayscale"
              />
              <div>
                <b.icon className="size-6 text-foreground" />
                <h2 className="mt-4 text-2xl font-extrabold text-foreground lg:text-3xl">{b.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{b.body}</p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {b.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="size-1.5 rounded-full bg-steel" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="border-y border-border bg-platinum">
        <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <p className="label-tech text-muted-foreground">How we work</p>
            <h2 className="mt-4 text-3xl font-extrabold text-foreground lg:text-4xl">From brief to dispatch</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="h-full rounded-sm border border-border bg-card p-7">
                  <p className="label-tech text-muted-foreground">Step {String(i + 1).padStart(2, "0")}</p>
                  <s.icon className="mt-5 size-6 text-foreground" />
                  <h3 className="mt-4 text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-24">
        <Reveal>
          <p className="label-tech text-muted-foreground">Product ranges</p>
          <h2 className="mt-4 text-3xl font-extrabold text-foreground lg:text-4xl">Explore the catalogue</h2>
          <div className="mt-8 flex flex-wrap gap-3">
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
          <Link
            to="/contact"
            search={{ intent: "quote" }}
            className="mt-10 inline-flex h-12 items-center gap-2 rounded-sm bg-graphite px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-steel"
          >
            Request a quote <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
