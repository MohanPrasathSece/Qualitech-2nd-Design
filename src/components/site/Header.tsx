import { Link } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/qualitech-logo.png.asset.json";
import { nav } from "@/data/site";
import { useCart } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl transition-all duration-300",
        scrolled ? "shadow-panel" : "",
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 lg:px-10">
        <Link to="/" className="flex shrink-0 items-center" aria-label={`${"Qualitech Connectronics"} home`}>
          <img
            src={logo.url}
            alt="Qualitech Connectronics Private Limited"
            className={cn("w-auto transition-all duration-300", scrolled ? "h-9" : "h-12")}
          />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
            >
              {item.label}
              <span className="absolute inset-x-3 -bottom-px hidden h-px bg-graphite data-[status=active]:block" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative grid size-10 place-items-center rounded-sm border border-border text-foreground transition-colors hover:bg-secondary"
            aria-label="Cart"
          >
            <ShoppingCart className="size-4" />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-graphite text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/contact"
            search={{ intent: "quote" }}
            className={cn(
              "hidden items-center rounded-sm bg-graphite px-5 text-sm font-semibold text-primary-foreground transition-all hover:bg-steel md:inline-flex",
              scrolled ? "h-10" : "h-11",
            )}
          >
            Request a Quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-sm border border-border xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background xl:hidden">
          <nav className="mx-auto flex max-w-[1400px] flex-col px-5 py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-sm font-medium text-foreground last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              search={{ intent: "quote" }}
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex h-11 items-center justify-center rounded-sm bg-graphite text-sm font-semibold text-primary-foreground"
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
