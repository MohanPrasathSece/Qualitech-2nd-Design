import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { categories } from "@/data/products";
import { company, nav } from "@/data/site";

export function Footer() {
  return (
    <footer className="brushed text-white/70">
      <div className="tech-grid">
        <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="inline-flex rounded-xl bg-white px-4 py-2.5 transition-shadow duration-300 hover:shadow-lg">
                <img
                  src={logo}
                  alt="Qualitech Connectronics Private Limited"
                  className="h-10 w-auto"
                  loading="lazy"
                />
              </div>
              <p className="mt-6 max-w-sm text-sm leading-relaxed">
                {company.name}
              </p>
              <p className="mt-3 label-tech text-white/40">
                Cable Assemblies · Connectors · Facilities
              </p>
            </div>

            <div className="lg:col-span-2">
              <h4 className="label-tech text-white">Navigation</h4>
              <ul className="mt-5 space-y-3 text-sm">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="transition-all duration-300 hover:text-white hover:pl-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="label-tech text-white">Product Categories</h4>
              <ul className="mt-5 space-y-3 text-sm">
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      to={`/products?category=${encodeURIComponent(c)}`}
                      className="transition-all duration-300 hover:text-white hover:pl-1"
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="label-tech text-white">Contact</h4>
              <address className="mt-5 space-y-1 text-sm not-italic leading-relaxed">
                {company.address.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </address>
              <dl className="mt-5 space-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="text-white/40">Phone</dt>
                  <dd>
                    <a href={`tel:${company.phone}`} className="transition-colors duration-300 hover:text-white">
                      {company.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-white/40">Fax</dt>
                  <dd>{company.fax}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-white/40">Email</dt>
                  <dd>
                    <a href={`mailto:${company.email}`} className="transition-colors duration-300 hover:text-white">
                      {company.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs md:flex-row md:items-center md:justify-between">
            <p>© {company.name}. All rights reserved.</p>
            <p className="label-tech text-white/35">Established {company.established} · Hyderabad, India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
