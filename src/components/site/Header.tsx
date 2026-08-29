import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ShoppingCart, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { nav } from "@/data/site";
import { useCart } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="fixed top-0 inset-x-0 z-50 px-3 py-3 sm:px-6 sm:py-4 transition-all duration-500 pointer-events-none">
      <header
        className={cn(
          "pointer-events-auto mx-auto max-w-[1400px] rounded-2xl sm:rounded-3xl border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "border-white/15 bg-graphite/90 text-white shadow-2xl backdrop-blur-2xl py-2.5 px-4 sm:px-7"
            : "border-white/10 bg-black/10 text-white backdrop-blur-md py-3 px-5 sm:px-8 shadow-lg shadow-black/5"
        )}
      >
        <div className="flex items-center justify-between gap-6">
          {/* Logo with clean white background chip for contrast */}
          <Link
            to="/"
            className="flex shrink-0 items-center transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            aria-label="Qualitech Connectronics home"
          >
            <div className="rounded-xl bg-white/95 px-3 py-1.5 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md">
              <img
                src={logo}
                alt="Qualitech Connectronics Private Limited"
                className={cn(
                  "w-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  scrolled ? "h-8 sm:h-9" : "h-9 sm:h-11"
                )}
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 xl:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "group relative rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300",
                    "hover:bg-white/10 hover:text-white",
                    isActive
                      ? "text-white bg-white/15 font-bold shadow-xs"
                      : "text-white/80 hover:text-white"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {/* Animated Underline Glow */}
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-[2.5px] rounded-full bg-brand-blue shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isActive
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover:scale-x-75 group-hover:opacity-60"
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="group relative grid size-11 place-items-center rounded-xl border border-white/15 bg-white/5 text-white transition-all duration-300 hover:border-brand-blue/60 hover:bg-brand-blue/20 hover:shadow-lg hover:scale-105 active:scale-95"
              aria-label="Cart"
            >
              <ShoppingCart className="size-[18px] transition-transform duration-300 group-hover:scale-110 text-white" />
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-brand-blue text-[10px] font-bold text-white shadow-md animate-in zoom-in duration-300">
                  {count}
                </span>
              )}
            </Link>

            {/* Request a Quote Button */}
            <Link
              to="/contact?intent=quote"
              className={cn(
                "hidden items-center gap-2 rounded-xl bg-white/90 px-5 text-sm font-bold text-graphite transition-all duration-300 shadow-md",
                "hover:bg-white hover:shadow-xl hover:shadow-brand-blue/20 hover:scale-105 active:scale-95 md:inline-flex",
                scrolled ? "h-10" : "h-11"
              )}
            >
              <span>Request a Quote</span>
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-xl border border-white/15 bg-white/5 text-white transition-all duration-300 hover:bg-white/15 active:scale-95 xl:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <div className="relative size-4">
                <Menu
                  className={cn(
                    "absolute inset-0 size-4 transition-all duration-300",
                    open ? "rotate-90 opacity-0 scale-75" : "rotate-0 opacity-100 scale-100"
                  )}
                />
                <X
                  className={cn(
                    "absolute inset-0 size-4 transition-all duration-300",
                    open ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-75"
                  )}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] xl:hidden",
            open
              ? "mt-4 max-h-[500px] border-t border-white/15 pt-3 opacity-100 bg-graphite/95 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl"
              : "max-h-0 border-t-0 pt-0 opacity-0"
          )}
        >
          <nav className="flex flex-col space-y-1">
            {nav.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-white/90 transition-all duration-300 hover:bg-white/10 hover:text-white hover:pl-4"
                style={{ transitionDelay: open ? `${i * 35}ms` : "0ms" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact?intent=quote"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex h-11 items-center justify-center rounded-xl bg-white text-sm font-bold text-graphite shadow-lg transition-all duration-300 hover:bg-white/90"
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}
