import { Link } from "react-router-dom";
import { ArrowRight, Hammer, Award, Settings, CheckCircle } from "lucide-react";
import factory from "@/assets/factory-floor.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

const facilitiesDetails = [
  {
    icon: Settings,
    title: "Precision Preparation & Cutting",
    body: "Automatic cutting, stripping, and pre-termination preparation machinery ensures length accuracy and consistent strip lengths across wire batches.",
    points: ["Automated wire cutting & stripping", "Pneumatic stripping machines", "Thermal stripping for insulation preservation"],
  },
  {
    icon: Hammer,
    title: "Assembly & Harness Laying",
    body: "Dedicated layout boards configured to customer engineering drawings. Visual aids and routing lines guarantee multi-branch harnesses align perfectly with OEM cabinets.",
    points: ["Scale routing boards", "Color-coded harness routing blueprints", "Optimized cable grouping and sleeve placement"],
  },
  {
    icon: Award,
    title: "Crimping & Termination Presses",
    body: "Advanced termination tooling for DSUB, DIN (EURO), IDC (FRC), and HARTING connector series, verifying electrical joints withstand severe tensile stress.",
    points: ["Calibrated hand tool crimpers", "Pneumatic presses for heavy terminals", "Semi-automatic applicator crimpers"],
  },
  {
    icon: CheckCircle,
    title: "Testing & Quality Control",
    body: "Every cable assembly undergoes 100% visual inspection and electrical continuity testing. Insulation resistance is tested before packing to ensure zero field failures.",
    points: ["Continuity and pin-out testers", "Pull-force test stand", "Visual check against customer drawing specs"],
  },
];

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Infrastructure"
        title="Facilities"
        lead="Our Hyderabad-based manufacturing facility combines state-of-the-art tooling with certified workmanship to deliver reliable interconnect systems."
        image={factory}
      />

      <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <p className="label-tech text-muted-foreground">Capabilities & Technology</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold text-foreground lg:text-4xl">
            Built for reliability and repeatability
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Since 1995, Qualitech has maintained a disciplined manufacturing floor. We invest in dedicated tooling for standard connectors and follow strict assembly procedures to guarantee that every harness matches the customer's engineering drawings.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {facilitiesDetails.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <div className="h-full rounded-xl border border-border bg-card p-8 transition-all hover:shadow-panel">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-platinum p-3 text-graphite">
                    <f.icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{f.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                <ul className="mt-6 space-y-2">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-foreground">
                      <span className="size-1.5 rounded-full bg-brand-yellow" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quality commitment strip */}
      <section className="border-y border-border bg-platinum py-16">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <Reveal className="text-center">
            <h2 className="text-2xl font-extrabold text-foreground">100% Checked Quality Guarantee</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Every harness is electrically tested for path continuity and short circuits. We maintain rigorous standards so that Qualitech assemblies integrate seamlessly into your systems.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-24">
        <Reveal className="flex flex-col items-start justify-between gap-8 rounded-xl border border-border bg-card p-10 lg:flex-row lg:items-center lg:p-14">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground">Need a custom assembly built?</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Send us your harness schematics, bill of materials, or physical samples. Our engineering team will review requirements and suggest optimal tooling.
            </p>
          </div>
          <Link
            to="/contact?intent=quote"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-graphite px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-steel"
          >
            Request quote review <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
