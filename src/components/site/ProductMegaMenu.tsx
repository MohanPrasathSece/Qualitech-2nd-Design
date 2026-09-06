import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, Sparkles, X, ExternalLink, Layers } from "lucide-react";
import { useProducts } from "@/lib/store";
import { amphenolCategories, zolexCategories, type Brand } from "@/data/products";
import { cn } from "@/lib/utils";

import connectorsImg from "@/assets/connectors.jpg";
import cablesImg from "@/assets/cable-assemblies.jpg";
import telecomImg from "@/assets/ind-telecom.jpg";
import powerImg from "@/assets/ind-power.jpg";
import factoryImg from "@/assets/factory-floor.jpg";

interface MegaCategory {
  id: string;
  brand: Brand;
  label: string;
  categoryFilter: string;
  description: string;
  subcategories: {
    title: string;
    items: {
      name: string;
      productId?: string;
      externalUrl?: string;
      categoryParam: string;
      badge?: string;
      previewDesc?: string;
      previewImage?: string;
    }[];
  }[];
}

const megaBrandCategories: MegaCategory[] = [
  /* ================== AMPHENOL ================== */
  {
    id: "amp-connectors",
    brand: "AMPHENOL",
    label: "Amphenol Connectors",
    categoryFilter: "Connectors",
    description: "Backplane, Mezzanine, Card Edge, Power, D-Sub, USB, and Rugged Harsh I/O solutions.",
    subcategories: [
      {
        title: "Board to Board & Power",
        items: [
          {
            name: "High Speed Backplane (Paladin / ExaMAX)",
            productId: "amp-b2b-paladin-backplane",
            externalUrl: "https://www.amphenol.com/products/connectors",
            categoryParam: "Connectors",
            badge: "112G PAM4",
            previewDesc: "Ultra-high-speed backplane differential pair interconnect.",
            previewImage: connectorsImg,
          },
          {
            name: "RADSOK & ePower High Current Supply",
            productId: "amp-power-radsok-epower",
            externalUrl: "https://www.amphenol.com/products/connectors",
            categoryParam: "Connectors",
            badge: "Up to 500A",
            previewDesc: "Patented high current contact cylinder for EV and heavy power.",
            previewImage: powerImg,
          },
          {
            name: "Cool Edge & PCIe Card Edge Series",
            productId: "amp-cardedge-cooledge",
            externalUrl: "https://www.amphenol.com/products/connectors",
            categoryParam: "Connectors",
            previewDesc: "0.65mm / 0.80mm PCIe Gen 4/5 accelerator card edge.",
            previewImage: connectorsImg,
          },
        ],
      },
      {
        title: "I/O, Server & Rugged Harsh Links",
        items: [
          {
            name: "D-Subminiature Standard & High Density",
            productId: "amp-dsub-harsh-io",
            externalUrl: "https://www.amphenol.com/products/connectors",
            categoryParam: "Connectors",
            previewDesc: "Rugged industrial D-Sub 9 to 50 pin and IP67 sealed connectors.",
            previewImage: connectorsImg,
          },
          {
            name: "USB Type-C & Harsh Commercial I/O",
            productId: "amp-usb-type-c-rugged",
            externalUrl: "https://www.amphenol.com/products/connectors",
            categoryParam: "Connectors",
            previewDesc: "Waterproof IP67 USB Type-C and USB 3.1 die-cast connectors.",
            previewImage: connectorsImg,
          },
          {
            name: "Industrial Ethernet (M12, RJ45 & SPE)",
            productId: "amp-industrial-ethernet-m12",
            externalUrl: "https://www.amphenol.com/products/connectors",
            categoryParam: "Connectors",
            previewDesc: "M12 X-code 10Gb/s and Single Pair Ethernet interconnects.",
            previewImage: telecomImg,
          },
        ],
      },
    ],
  },
  {
    id: "amp-cables",
    brand: "AMPHENOL",
    label: "Amphenol Cables",
    categoryFilter: "Cables",
    description: "Active Optical Cables (AOC), Direct Attach Copper (DAC), OverPass and High-Speed Assemblies.",
    subcategories: [
      {
        title: "Data Center & Hyperscale",
        items: [
          {
            name: "Active Optical Cables (AOC) — 100G to 800G",
            productId: "amp-cab-aoc-active-optical",
            externalUrl: "https://www.amphenol.com/products/cables",
            categoryParam: "Cables",
            badge: "800G Ready",
            previewDesc: "High-speed plug-and-play optical assemblies for switches.",
            previewImage: cablesImg,
          },
          {
            name: "Direct Attach Copper Cables (DAC & AEC)",
            productId: "amp-cab-dac-direct-attach",
            externalUrl: "https://www.amphenol.com/products/cables",
            categoryParam: "Cables",
            previewDesc: "Twinaxial low-loss copper assemblies from 25G to 800G.",
            previewImage: cablesImg,
          },
        ],
      },
      {
        title: "Internal Systems & Industrial",
        items: [
          {
            name: "OverPass Twinax Architecture",
            productId: "amp-cab-overpass-system",
            externalUrl: "https://www.amphenol.com/products/cables",
            categoryParam: "Cables",
            badge: "Low Loss",
            previewDesc: "Near-ASIC internal twinax cable bypass eliminating PCB trace loss.",
            previewImage: cablesImg,
          },
          {
            name: "Industrial Shielded M12 & RJ45 Cables",
            productId: "amp-cab-industrial-m12-rj45",
            externalUrl: "https://www.amphenol.com/products/cables",
            categoryParam: "Cables",
            previewDesc: "Drag-chain rated continuous flex cables for automation.",
            previewImage: cablesImg,
          },
        ],
      },
    ],
  },
  {
    id: "amp-fiber-antennas",
    brand: "AMPHENOL",
    label: "Fiber Optics & Antennas",
    categoryFilter: "Fiber Optics",
    description: "Optical Transceivers, Expanded Beam Connectors, 5G/GNSS Combo & Embedded Antennas.",
    subcategories: [
      {
        title: "Fiber Optics & Transceivers",
        items: [
          {
            name: "100Gb/s QSFP28 Transceivers",
            productId: "amp-fo-qsfp28-100g",
            externalUrl: "https://www.amphenol.com/products/connectors-fiber-optic",
            categoryParam: "Fiber Optics",
            badge: "100G",
            previewDesc: "QSFP28 optical modules for data center backbone links.",
            previewImage: telecomImg,
          },
          {
            name: "109 Series Fiber Optic Connectors",
            productId: "amp-fo-109-series-connectors",
            externalUrl: "https://www.amphenol.com/products/connectors-fiber-optic",
            categoryParam: "Fiber Optics",
            previewDesc: "Expanded beam harsh-environment multi-channel optical connectors.",
            previewImage: telecomImg,
          },
        ],
      },
      {
        title: "Antennas & RF",
        items: [
          {
            name: "Combo Antennas (5G + GNSS + Wi-Fi)",
            productId: "amp-ant-combo-multipurpose",
            externalUrl: "https://www.amphenol.com/products/antenna-solutions",
            categoryParam: "Antennas",
            badge: "Multi-Band",
            previewDesc: "All-in-one rugged radome for fleet telemetry and EV chargers.",
            previewImage: telecomImg,
          },
          {
            name: "Embedded PCB/FPC & NFC Antennas",
            productId: "amp-ant-embedded-pcb-fpc",
            externalUrl: "https://www.amphenol.com/products/antenna-solutions",
            categoryParam: "Antennas",
            previewDesc: "Ultra-compact internal antennas for IoT devices.",
            previewImage: telecomImg,
          },
        ],
      },
    ],
  },

  /* ================== ZOLEX ================== */
  {
    id: "zol-lugs-terminals",
    brand: "ZOLEX",
    label: "Zolex Lugs & Terminals",
    categoryFilter: "Copper Lugs & Connectors",
    description: "Electrolytic Copper Lugs, Aluminium Lugs, Bimetallic Al/Cu Links, and Crimp Terminals.",
    subcategories: [
      {
        title: "Lugs & Connectors",
        items: [
          {
            name: "Copper Tube Crimping Lugs (1-Hole / 2-Hole / 4-Hole)",
            productId: "zol-cl-one-hole-tubular",
            externalUrl: "https://www.zolex.in/products.php?category=copper-lugs",
            categoryParam: "Copper Lugs & Connectors",
            badge: "99.9% ETP",
            previewDesc: "Seamless ETP copper lugs annealed for uniform crimp integrity.",
            previewImage: powerImg,
          },
          {
            name: "Bimetallic Friction-Welded Lugs (Al/Cu)",
            productId: "zol-bm-friction-welded-lugs",
            externalUrl: "https://www.zolex.in/products.php?category=bimetallic-lugs",
            categoryParam: "Bimetallic Lugs & Connectors",
            badge: "Anti-Corrosion",
            previewDesc: "Solid-state friction welded Al/Cu lugs preventing galvanic corrosion.",
            previewImage: powerImg,
          },
          {
            name: "Aluminium Tube & Solid Sector Lugs",
            productId: "zol-al-tube-lugs-one-hole",
            externalUrl: "https://www.zolex.in/products.php?category=aluminium-lugs",
            categoryParam: "Aluminium Lugs & Connectors",
            previewDesc: "Pre-filled with oxide-inhibitor paste for pure aluminium cables.",
            previewImage: powerImg,
          },
        ],
      },
      {
        title: "Crimp Terminals",
        items: [
          {
            name: "Non-Insulated & Insulated Ring Terminals",
            productId: "zol-crimpt-non-ins-ring",
            externalUrl: "https://www.zolex.in/products.php?category=crimp-terminals",
            categoryParam: "Crimp Terminals",
            previewDesc: "Electro-tinned high conductivity ring terminals for stud screws.",
            previewImage: connectorsImg,
          },
          {
            name: "Bootlace End Sleeves (Single & Twin Insulated)",
            productId: "zol-crimpt-end-sleeves",
            externalUrl: "https://www.zolex.in/products.php?category=crimp-terminals",
            categoryParam: "Crimp Terminals",
            previewDesc: "German DIN 46228 ferrules for gas-tight panel terminal wiring.",
            previewImage: connectorsImg,
          },
        ],
      },
    ],
  },
  {
    id: "zol-glands-earthing-ties",
    brand: "ZOLEX",
    label: "Glands, Earthing & SS Ties",
    categoryFilter: "Cable Glands & Accessories",
    description: "Flameproof Double Compression Glands, Earthing Accessories, SS Cable Ties & Tensioning Tools.",
    subcategories: [
      {
        title: "Cable Glands & Hardware",
        items: [
          {
            name: "Double Compression Flameproof Gland (Ex d/Ex e)",
            productId: "zol-cg-double-compression-flameproof",
            externalUrl: "https://www.zolex.in/products.php?category=cable-glands",
            categoryParam: "Cable Glands & Accessories",
            badge: "ATEX / IECEx",
            previewDesc: "Gas-tight explosion-proof brass glands for hazardous Zones 1 & 2.",
            previewImage: powerImg,
          },
          {
            name: "Industrial Cable Glands (A2, BW, CW, E1W, A2F)",
            productId: "zol-cg-single-compression-industrial",
            externalUrl: "https://www.zolex.in/products.php?category=cable-glands",
            categoryParam: "Cable Glands & Accessories",
            previewDesc: "BS 6121 compliant single and armored weatherproof glands.",
            previewImage: powerImg,
          },
        ],
      },
      {
        title: "Earthing, SS Ties & Tools",
        items: [
          {
            name: "Copper Bonded Earth Rods (Min. 250 Microns)",
            productId: "zol-ea-copper-bonded-rods",
            externalUrl: "https://www.zolex.in/products.php?category=earthing-accessories",
            categoryParam: "Earthing Accessories",
            badge: "250µm Cu",
            previewDesc: "Molecularly copper bonded steel earth rods for low ground resistance.",
            previewImage: powerImg,
          },
          {
            name: "Roller Ball Lock SS Cable Ties (SS 304 / SS 316)",
            productId: "zol-ss-roller-ball-ties",
            externalUrl: "https://www.zolex.in/products.php?category=ss-cable-ties",
            categoryParam: "SS Cable Ties",
            previewDesc: "Corrosion and UV-proof stainless steel ties for solar and offshore.",
            previewImage: factoryImg,
          },
          {
            name: "Automatic Cable Tie Tensioning & Cutting Gun",
            productId: "zol-tool-tie-tensioning-gun",
            externalUrl: "https://www.zolex.in/products.php?category=tools",
            categoryParam: "Tools",
            previewDesc: "Ergonomic tool with automatic flush cutoff for stainless steel ties.",
            previewImage: factoryImg,
          },
        ],
      },
    ],
  },
];

export function ProductMegaMenu({
  activeBrand,
  activeCategory,
  onSelectBrandAndCategory,
}: {
  activeBrand: string;
  activeCategory: string;
  onSelectBrandAndCategory: (brand: string, category: string) => void;
}) {
  const { getProduct } = useProducts();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [hoveredPreview, setHoveredPreview] = useState<{
    name: string;
    brand: string;
    desc: string;
    image: string;
    externalUrl?: string | undefined;
    category: string;
  } | null>(null);

  const handleMouseEnterTab = (cat: MegaCategory) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setOpenMenu(cat.id);
    const firstItem = cat.subcategories[0]?.items[0];
    if (firstItem) {
      const prod = firstItem.productId ? getProduct(firstItem.productId) : undefined;
      setHoveredPreview({
        name: firstItem.name,
        brand: cat.brand,
        desc: firstItem.previewDesc || prod?.shortDescription || cat.description,
        image: prod?.images[0] || firstItem.previewImage || connectorsImg,
        externalUrl: firstItem.externalUrl || prod?.externalUrl,
        category: firstItem.categoryParam,
      });
    }
  };

  const handleMouseLeaveMenu = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 250);
  };

  const handleHoverItem = (item: MegaCategory["subcategories"][0]["items"][0], brand: Brand) => {
    const prod = item.productId ? getProduct(item.productId) : undefined;
    setHoveredPreview({
      name: item.name,
      brand: brand,
      desc: item.previewDesc || prod?.shortDescription || "Official manufacturer product specification.",
      image: prod?.images[0] || item.previewImage || connectorsImg,
      externalUrl: item.externalUrl || prod?.externalUrl,
      category: item.categoryParam,
    });
  };

  const activeMega = megaBrandCategories.find((m) => m.id === openMenu);

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
          {/* All Products Tab */}
          <button
            onClick={() => {
              onSelectBrandAndCategory("All", "All");
              setOpenMenu(null);
            }}
            className={cn(
              "rounded-xl px-4 py-2.5 text-xs sm:text-sm font-extrabold transition-all duration-300",
              activeBrand === "All" && activeCategory === "All" && !openMenu
                ? "bg-graphite text-white shadow-md"
                : "text-foreground/80 hover:bg-brand-blue/10 hover:text-brand-blue"
            )}
          >
            All Products
          </button>

          {/* Mega Category Tabs */}
          {megaBrandCategories.map((cat) => {
            const isTabActive =
              activeBrand.toUpperCase() === cat.brand.toUpperCase() ||
              activeCategory.toLowerCase() === cat.categoryFilter.toLowerCase();

            return (
              <button
                key={cat.id}
                onMouseEnter={() => handleMouseEnterTab(cat)}
                onClick={() => {
                  onSelectBrandAndCategory(cat.brand, cat.categoryFilter);
                  setOpenMenu(openMenu === cat.id ? null : cat.id);
                }}
                className={cn(
                  "group flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300",
                  openMenu === cat.id
                    ? cat.brand === "AMPHENOL"
                      ? "bg-brand-blue text-white shadow-md"
                      : "bg-amber-600 text-white shadow-md"
                    : isTabActive
                    ? "bg-graphite text-white shadow-sm"
                    : "text-foreground/80 hover:bg-brand-blue/10 hover:text-brand-blue"
                )}
              >
                <span
                  className={cn(
                    "size-2 rounded-full",
                    cat.brand === "AMPHENOL" ? "bg-cyan-400" : "bg-amber-400"
                  )}
                />
                <span>{cat.label}</span>
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-300 opacity-80 group-hover:opacity-100",
                    openMenu === cat.id && "rotate-180 text-white"
                  )}
                />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {openMenu && (
            <button
              onClick={() => setOpenMenu(null)}
              className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-bold text-foreground hover:bg-secondary hover:text-brand-blue transition-all shadow-xs"
            >
              <X className="size-3.5" />
              <span>Close</span>
            </button>
          )}

          <Link
            to="/contact?intent=quote"
            className="hidden items-center gap-2 rounded-xl bg-graphite px-4 py-2 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:bg-brand-blue sm:inline-flex"
          >
            <Sparkles className="size-3.5 text-brand-yellow" />
            <span>RFQ Quote</span>
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
                  <span
                    className={cn(
                      "absolute left-2.5 top-2.5 rounded-lg px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white backdrop-blur-sm shadow-sm",
                      hoveredPreview?.brand === "AMPHENOL" ? "bg-blue-600/90" : "bg-amber-600/90"
                    )}
                  >
                    {hoveredPreview?.brand || activeMega.brand}
                  </span>
                  <span className="absolute right-2.5 top-2.5 rounded-lg bg-background/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-foreground backdrop-blur-sm shadow-xs">
                    {hoveredPreview?.category || activeMega.categoryFilter}
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-bold text-foreground line-clamp-1">
                    {hoveredPreview?.name}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {hoveredPreview?.desc}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-border/80 pt-3 gap-2">
                    {hoveredPreview?.externalUrl ? (
                      <a
                        href={hoveredPreview.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all",
                          hoveredPreview?.brand === "AMPHENOL"
                            ? "bg-brand-blue hover:bg-blue-700"
                            : "bg-amber-600 hover:bg-amber-700"
                        )}
                      >
                        <span>View on {hoveredPreview?.brand === "AMPHENOL" ? "Amphenol" : "Zolex"}</span>
                        <ExternalLink className="size-3" />
                      </a>
                    ) : null}

                    <button
                      onClick={() => {
                        onSelectBrandAndCategory(activeMega.brand, activeMega.categoryFilter);
                        setOpenMenu(null);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-graphite px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-brand-blue ml-auto"
                    >
                      <span>Filter View</span>
                      <ArrowRight className="size-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Center & Right Columns: Subcategories & Product Links List */}
            <div className="lg:col-span-8 grid gap-6 sm:grid-cols-2">
              {activeMega.subcategories.map((sub) => (
                <div key={sub.title} className="space-y-3">
                  <h5 className="border-b border-border/80 pb-2 text-xs font-extrabold uppercase tracking-wider text-brand-blue flex items-center gap-2">
                    <Layers className="size-3.5" />
                    <span>{sub.title}</span>
                  </h5>
                  <ul className="space-y-1.5">
                    {sub.items.map((item) => (
                      <li key={item.name}>
                        <div
                          onMouseEnter={() => handleHoverItem(item, activeMega.brand)}
                          className="group flex items-center justify-between rounded-xl p-2 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 hover:bg-brand-blue/10 hover:text-brand-blue"
                        >
                          <button
                            onClick={() => {
                              onSelectBrandAndCategory(activeMega.brand, item.categoryParam);
                              setOpenMenu(null);
                            }}
                            className="flex flex-1 items-center gap-2 text-left"
                          >
                            <span className="size-1.5 rounded-full bg-brand-blue/40 group-hover:bg-brand-blue group-hover:scale-125 transition-all" />
                            <span className="font-semibold text-xs sm:text-sm">{item.name}</span>
                          </button>

                          <div className="flex items-center gap-2 shrink-0">
                            {item.badge && (
                              <span className="rounded-md bg-brand-yellow/20 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                                {item.badge}
                              </span>
                            )}
                            {item.externalUrl && (
                              <a
                                href={item.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`Open official ${activeMega.brand} page`}
                                className="size-6 rounded-md bg-platinum flex items-center justify-center text-muted-foreground hover:bg-brand-blue hover:text-white transition-colors"
                              >
                                <ExternalLink className="size-3" />
                              </a>
                            )}
                          </div>
                        </div>
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
