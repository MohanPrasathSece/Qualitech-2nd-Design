import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import factory from "@/assets/factory-floor.jpg";
import cableAssemblies from "@/assets/cable-assemblies.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Counter, Reveal } from "@/components/site/Reveal";
import { company, companyCopy, stats, whyQualitech } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Qualitech Connectronics — Harness Manufacturer Since 1995" },
      {
        name: "description",
        content:
          "Qualitech Connectronics was established in 1995 in Hyderabad and supplies custom wire harnesses and connectors to OEMs across telecom, power, defense and railways.",
      },
      { property: "og:title", content: "About Qualitech Connectronics" },
      {
        property: "og:description",
        content: "Three decades of custom harness manufacturing and connector supply for OEMs.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow={`Established ${company.established}`}
        title="About Us"
        lead="A team of professionals building reliable interconnect for original equipment manufacturers."
        image={factory}
      />

      <section className="mx-auto grid max-w-[1400px] gap-14 px-5 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
        <Reveal className="lg:col-span-7">
          <p className="label-tech text-muted-foreground">Our story</p>
          <h2 className="mt-4 text-3xl font-extrabold text-foreground lg:text-4xl">
            Grown from strength to strength
          </h2>
          <div className="mt-8 space-y-6">
            {companyCopy.map((para) => (
              <p key={para.slice(0, 24)} className="text-base leading-relaxed text-muted-foreground">
                {para}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-5">
          <img
            src={cableAssemblies}
            alt="Terminated cable assemblies"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-sm object-cover grayscale"
          />
        </Reveal>
      </section>

      <section className="border-y border-border bg-platinum">
        <div className="mx-auto grid max-w-[1400px] gap-px overflow-hidden bg-border px-0 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card px-6 py-12 text-center">
              <p className="text-4xl font-extrabold text-foreground">
                <Counter value={s.value} suffix={s.suffix} literal={"literal" in s ? s.literal : undefined} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <p className="label-tech text-muted-foreground">Why Qualitech</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold text-foreground lg:text-4xl">
            What our customers rely on
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyQualitech.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <div className="h-full rounded-sm border border-border bg-card p-7">
                <CheckCircle2 className="size-5 text-foreground" />
                <h3 className="mt-4 text-lg font-bold text-foreground">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14">
          <Link
            to="/facilities"
            className="inline-flex h-12 items-center gap-2 rounded-sm bg-graphite px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-steel"
          >
            See our facilities <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
