import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead?: string;
  image?: string;
}

export function PageHero({ eyebrow, title, lead, image }: PageHeroProps) {
  return (
    <section className="brushed relative overflow-hidden pt-28 lg:pt-36">
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover opacity-25 grayscale"
        />
      )}
      <div className="tech-grid relative">
        <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
          <Reveal>
            <nav className="flex items-center gap-2 text-xs text-white/50">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="size-3" />
              <span className="text-white/80">{title}</span>
            </nav>
            <p className="label-tech mt-8 text-white/50">{eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold text-white lg:text-6xl tracking-tight">
              {title}
            </h1>
            {lead && <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70">{lead}</p>}
          </Reveal>
        </div>
      </div>
      <span className="signal-line absolute bottom-0 left-0 h-px w-1/3 bg-white/50" />
    </section>
  );
}
