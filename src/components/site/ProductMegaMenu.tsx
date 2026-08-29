import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, Sparkles, X, CheckCircle2 } from "lucide-react";
import { useProducts, formatINR } from "@/lib/store";
import { cn } from "@/lib/utils";

// Fallback image assets
import connectorsImg from "@/assets/connectors.jpg";
import cablesImg from "@/assets/cable-assemblies.jpg";
import telecomImg from "@/assets/ind-telecom.jpg";
import heroImg from "@/assets/hero-harness.jpg";

interface MegaCategory {
  id: string;
  label: string;
  categoryFilter?: string;
  subcategories: {
    title: string;
    items: {
      name: string;
      productId?: string;
      categoryParam?: string;
      badge?: string;
      isHot?: boolean;
      previewImage?: string;
      previewDesc?: string;
      previewCode?: string;
    }[];
  }[];
}

const megaCategories: MegaCategory[] = [
  {
    id: "connectors",
    label: "Connectors",
    categoryFilter: "Connectors",
    subcategories: [
      {
        title: "Standard & High-Density Series",
        items: [
          {
            name: "D-Subminiature 9 Pin — Male",
            productId: "dsub-9-male",
            previewCode: "QTC-DS-09M",
            previewDesc: "Standard 9-pin D-Sub connector for signal interconnect, panel and cable mount.",
            previewImage: connectorsImg,
          },
          {
            name: "D-Subminiature 25 Pin — Female",
            productId: "dsub-25-female",
            previewCode: "QTC-DS-25F",
            previewDesc: "25-pin D-Sub female connector for multi-channel instrumentation and control.",
            previewImage: connectorsImg,
          },
          {
            name: "DIN (EURO) 41612 — 64 Way",
            productId: "din-euro-64",
            previewCode: "QTC-DIN-64",
            previewDesc: "Backplane and rack system card-edge interconnect connector.",
            previewImage: connectorsImg,
          },
          {
            name: "HARTING Heavy-Duty & Modular",
            productId: "harting-din-euro-h15",
            previewCode: "QTC-HRT-MOD01",
            previewDesc: "Industrial modular high-current and multi-pin connector solutions.",
            previewImage: connectorsImg,
          },
        ],
      },
      {
        title: "Accessories & Hardware",
        items: [
          {
            name: "Metallised D-Sub Backshell Hoods",
            categoryParam: "Connectors",
            previewCode: "QTC-DSA-HD01",
            previewDesc: "EMI-shielded metal backshells with strain relief cable clamps.",
            previewImage: connectorsImg,
          },
          {
            name: "Jack Screws & Fastener Hardware",
            categoryParam: "Connectors",
            previewCode: "QTC-DSA-JS02",
            previewDesc: "Mating hardware, nuts, and standoffs for panel mounting.",
            previewImage: connectorsImg,
          },
          {
            name: "Crimp Pins, Sockets & Housings",
            categoryParam: "Connectors",
            previewCode: "QTC-OTH-01",
            previewDesc: "Loose terminal pins, gold-plated contacts and protective housings.",
            previewImage: connectorsImg,
          },
        ],
      },
    ],
  },
  {
    id: "cables",
    label: "Cables & Harnesses",
    categoryFilter: "Cables",
    subcategories: [
      {
        title: "Custom Wire Harnesses",
        items: [
          {
            name: "Custom Multi-Branch Wire Harness",
            productId: "custom-harness-multi-branch",
            previewCode: "QTC-CA-MB01",
            badge: "OEM Custom",
            isHot: true,
            previewDesc: "Built to customer CAD schematics with 1:1 jig board layout and 100% testing.",
            previewImage: heroImg,
          },
          {
            name: "High-Flex Drag Chain Cable Assembly",
            productId: "high-flex-drag-chain-cable",
            previewCode: "QTC-CAB-DRAG01",
            previewDesc: "Rated for >5M continuous flex bending cycles in robotic automation tracks.",
            previewImage: cablesImg,
          },
          {
            name: "Mil-Spec Screened Circular Assembly",
            productId: "circular-connector-assembly",
            previewCode: "QTC-CA-CC02",
            previewDesc: "Braided EMI-screened harsh-environment interconnect assembly.",
            previewImage: heroImg,
          },
        ],
      },
      {
        title: "Ribbon & I/O Cables",
        items: [
          {
            name: "IDC (FRC) 40-Way Ribbon Assembly",
            productId: "idc-frc-assembly-40",
            previewCode: "QTC-IDC-A40",
            previewDesc: "Flat ribbon cable assembly terminated to custom length and polarity.",
            previewImage: cablesImg,
          },
          {
            name: "Active Electrical & Sensor Wiring",
            categoryParam: "Cables",
            previewCode: "QTC-CAB-SENS01",
            previewDesc: "Custom molded sensor links and power distribution loom bundles.",
            previewImage: cablesImg,
          },
          {
            name: "OverPass / Direct Attach Cables",
            categoryParam: "Cables",
            previewCode: "QTC-CAB-DAC01",
            previewDesc: "High-speed board-to-board and panel jump cable solutions.",
            previewImage: heroImg,
          },
        ],
      },
    ],
  },
  {
    id: "fiber-optics",
    label: "Fiber Optics",
    categoryFilter: "Fiber Optics",
    subcategories: [
      {
        title: "Optical Assemblies",
        items: [
          {
            name: "MPO/MTP 12/24 Fiber Trunk Cable",
            productId: "fiber-mpo-trunk-cable",
            previewCode: "QTC-FO-MPO12",
            badge: "High Density",
            isHot: true,
            previewDesc: "Ultra low-loss factory-terminated OM4 / OS2 trunk cable for telecom and data.",
            previewImage: cablesImg,
          },
          {
            name: "Duplex LC-SC Armored Patch Cord",
            productId: "fiber-duplex-lc-sc-patch",
            previewCode: "QTC-FO-LCSC",
            previewDesc: "Stainless steel flexible armored duplex patch cord for rugged routing.",
            previewImage: cablesImg,
          },
          {
            name: "Singlemode (OS2) & Multimode (OM4) Pigtails",
            categoryParam: "Fiber Optics",
            previewCode: "QTC-FO-PIG01",
            previewDesc: "Pre-polished fiber optic pigtails for fusion splicing cabinets.",
            previewImage: cablesImg,
          },
        ],
      },
    ],
  },
  {
    id: "antennas",
    label: "Antennas",
    categoryFilter: "Antennas",
    subcategories: [
      {
        title: "GNSS & Positioning Antennas",
        items: [
          {
            name: "GNSS Full-Coverage External Antenna with LNA",
            productId: "gnss-external-antenna",
            previewCode: "QTC-ANT-GNSS01",
            badge: "Featured",
            isHot: true,
            previewDesc: "Single, dual, and tri-band GNSS with built-in high-gain LNA and IP68 waterproof housing.",
            previewImage: telecomImg,
          },
          {
            name: "5G / LTE Rugged Puck Antenna — IP68",
            productId: "5g-lte-puck-antenna",
            previewCode: "QTC-ANT-5G02",
            previewDesc: "Heavy-duty omnidirectional antenna for EV charging and telematics gateways.",
            previewImage: telecomImg,
          },
        ],
      },
      {
        title: "Customizable RF Components",
        items: [
          {
            name: "RF Coaxial Cables: RG174, RG316, RG58, LMR200",
            categoryParam: "Antennas",
            previewCode: "QTC-RF-CAB",
            previewDesc: "Custom lengths and low-loss dielectric jackets for high frequency signal links.",
            previewImage: telecomImg,
          },
          {
            name: "RF Connectors: SMA, SMB, Type-N, TNC, BNC, MMCX",
            categoryParam: "Antennas",
            previewCode: "QTC-RF-CON",
            previewDesc: "Precision 50-ohm gold-plated brass RF connectors for antennas.",
            previewImage: connectorsImg,
          },
        ],
      },
    ],
  },
];

export function ProductMegaMenu({
  activeCategory,
  onSelectCategory,
}: {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}) {
  const { getProduct } = useProducts();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic preview state when hovering items inside dropdown
  const [hoveredPreview, setHoveredPreview] = useState<{
    name: string;
    code: string;
    desc: string;
    image: string;
    price?: number | null;
    productId?: string;
  } | null>(null);

  const handleMouseEnterTab = (cat: MegaCategory) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setOpenMenu(cat.id);
    // Initialize preview with first item in category
    const firstItem = cat.subcategories[0]?.items[0];
    if (firstItem) {
      const prod = firstItem.productId ? getProduct(firstItem.productId) : undefined;
      setHoveredPreview({
        name: firstItem.name,
        code: firstItem.previewCode || prod?.code || "QTC-SERIES",
        desc: firstItem.previewDesc || prod?.shortDescription || "High-reliability industrial interconnect.",
        image: prod?.images[0] || firstItem.previewImage || connectorsImg,
        price: prod?.price,
        productId: firstItem.productId,
      });
    }
  };

  const handleMouseLeaveMenu = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 250);
  };

  const handleHoverItem = (item: MegaCategory["subcategories"][0]["items"][0]) => {
    const prod = item.productId ? getProduct(item.productId) : undefined;
    setHoveredPreview({
      name: item.name,
      code: item.previewCode || prod?.code || "QTC-SERIES",
      desc: item.previewDesc || prod?.shortDescription || "High-reliability industrial interconnect.",
      image: prod?.images[0] || item.previewImage || connectorsImg,
      price: prod?.price,
      productId: item.productId,
    });
  };

  const activeMega = megaCategories.find((m) => m.id === openMenu);

  return (
    <div
      className="relative mb-8 rounded-3xl border border-border/80 bg-card shadow-lg transition-all duration-300"
      onMouseEnter={() => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      }}
      onMouseLeave={handleMouseLeaveMenu}
    >
      {/* Category Nav Tab Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 sm:p-3.5">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              onSelectCategory("All");
              setOpenMenu(null);
            }}
            className={cn(
              "rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300",
              activeCategory === "All" && !openMenu
                ? "bg-graphite text-white shadow-md"
                : "text-muted-foreground hover:bg-platinum hover:text-foreground"
            )}
          >
            All Products
          </button>

          {megaCategories.map((cat) => (
            <button
              key={cat.id}
              onMouseEnter={() => handleMouseEnterTab(cat)}
              onClick={() => {
                if (cat.categoryFilter) onSelectCategory(cat.categoryFilter);
                setOpenMenu(openMenu === cat.id ? null : cat.id);
              }}
              className={cn(
                "group flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300",
                openMenu === cat.id
                  ? "bg-brand-blue text-white shadow-md"
                  : activeCategory.toLowerCase() === (cat.categoryFilter || "").toLowerCase()
                  ? "bg-graphite text-white shadow-sm"
                  : "text-muted-foreground hover:bg-platinum hover:text-foreground"
              )}
            >
              <span>{cat.label}</span>
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-300 opacity-70 group-hover:opacity-100",
                  openMenu === cat.id && "rotate-180"
                )}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {openMenu && (
            <button
              onClick={() => setOpenMenu(null)}
              className="flex items-center gap-1 rounded-xl border border-border bg-platinum px-3 py-2 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-chrome transition-all"
            >
              <X className="size-3.5" />
              <span>Close Menu</span>
            </button>
          )}

          <Link
            to="/contact?intent=quote"
            className="hidden items-center gap-2 rounded-xl bg-platinum px-4 py-2 text-xs font-bold text-foreground transition-all duration-300 hover:bg-brand-blue hover:text-white sm:inline-flex"
          >
            <Sparkles className="size-3.5" />
            <span>Custom Quoting</span>
          </Link>
        </div>
      </div>

      {/* In-Flow Expanding Mega-Dropdown Panel with Live Hover Preview */}
      {openMenu && activeMega && (
        <div className="border-t border-border/80 bg-background/60 p-6 lg:p-8 rounded-b-3xl animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Left Preview Column: Dynamic Live Image & Specs Card */}
            <div className="lg:col-span-4">
              <div className="overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-300">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-platinum">
                  {hoveredPreview?.image ? (
                    <img
                      src={hoveredPreview.image}
                      alt={hoveredPreview.name}
                      className="size-full object-cover transition-all duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="size-full bg-platinum" />
                  )}
                  <span className="absolute left-2.5 top-2.5 rounded-lg bg-graphite/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm shadow-sm">
                    {hoveredPreview?.code || "Product Preview"}
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="text-base font-bold text-foreground line-clamp-1">
                    {hoveredPreview?.name}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {hoveredPreview?.desc}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-border/80 pt-3">
                    <span className="text-sm font-extrabold text-foreground">
                      {hoveredPreview?.price ? formatINR(hoveredPreview.price) : "Price on Request"}
                    </span>

                    {hoveredPreview?.productId ? (
                      <Link
                        to={`/products/${hoveredPreview.productId}`}
                        onClick={() => setOpenMenu(null)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-blue px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-graphite"
                      >
                        <span>View Specs</span>
                        <ArrowRight className="size-3" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          if (activeMega.categoryFilter) onSelectCategory(activeMega.categoryFilter);
                          setOpenMenu(null);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-graphite px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-brand-blue"
                      >
                        <span>Filter Category</span>
                        <ArrowRight className="size-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Center & Right Columns: Subcategories & Product Links List */}
            <div className="lg:col-span-8 grid gap-6 sm:grid-cols-2">
              {activeMega.subcategories.map((sub) => (
                <div key={sub.title} className="space-y-3">
                  <h5 className="border-b border-border/80 pb-2 text-xs font-extrabold uppercase tracking-wider text-brand-blue">
                    {sub.title}
                  </h5>
                  <ul className="space-y-1.5">
                    {sub.items.map((item) => (
                      <li key={item.name}>
                        {item.productId ? (
                          <Link
                            to={`/products/${item.productId}`}
                            onClick={() => setOpenMenu(null)}
                            onMouseEnter={() => handleHoverItem(item)}
                            className="group flex items-center justify-between rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 hover:bg-brand-blue/10 hover:text-brand-blue hover:pl-4"
                          >
                            <span className="flex items-center gap-2">
                              <span className="size-1.5 rounded-full bg-brand-blue/40 group-hover:bg-brand-blue group-hover:scale-125 transition-all" />
                              <span className="font-semibold">{item.name}</span>
                            </span>
                            {item.badge && (
                              <span className="rounded-md bg-brand-yellow/20 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ) : (
                          <button
                            onClick={() => {
                              if (item.categoryParam) onSelectCategory(item.categoryParam);
                              else if (activeMega.categoryFilter) onSelectCategory(activeMega.categoryFilter);
                              setOpenMenu(null);
                            }}
                            onMouseEnter={() => handleHoverItem(item)}
                            className="group flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs sm:text-sm font-medium text-foreground transition-all duration-200 hover:bg-brand-blue/10 hover:text-brand-blue hover:pl-4"
                          >
                            <span className="flex items-center gap-2">
                              <span className="size-1.5 rounded-full bg-brand-blue/40 group-hover:bg-brand-blue group-hover:scale-125 transition-all" />
                              <span className="font-semibold">{item.name}</span>
                            </span>
                            {item.badge && (
                              <span className="rounded-md bg-brand-yellow/20 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
