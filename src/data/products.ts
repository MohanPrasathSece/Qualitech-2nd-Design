import cableAssemblies from "@/assets/cable-assemblies.jpg";
import connectors from "@/assets/connectors.jpg";
import hero from "@/assets/hero-harness.jpg";

export const categories = [
  "DSUB",
  "DSUB Accessories",
  "DIN (EURO)",
  "IDC (FRC)",
  "HARTING DIN (EURO)",
  "Others",
  "Cable Assemblies",
] as const;

export type Category = (typeof categories)[number];

export type Availability = "In Stock" | "Contact for Availability";

export interface Product {
  id: string;
  name: string;
  code: string;
  category: Category;
  type: string;
  price: number | null;
  availability: Availability;
  featured: boolean;
  shortDescription: string;
  description: string;
  specifications: { label: string; value: string }[];
  applications: string[];
  images: string[];
  createdAt: string;
}

/**
 * Seed catalogue. Replaceable: the product store persists admin edits and the
 * storefront always renders from the store, never from this array directly.
 * Descriptions are generic on purpose — no specifications are claimed beyond
 * what is published by the company.
 */
export const seedProducts: Product[] = [
  {
    id: "dsub-9-male",
    name: "D-Sub Connector 9 Pin — Male",
    code: "QTC-DS-09M",
    category: "DSUB",
    type: "Connector",
    price: 145,
    availability: "In Stock",
    featured: true,
    shortDescription: "Standard 9 pin D-Sub male connector for signal interconnect applications.",
    description:
      "Standard density 9 pin D-Sub male connector supplied for panel and cable mounting applications. Available in solder bucket and crimp variants, and supplied loose or terminated as part of a custom cable assembly.",
    specifications: [
      { label: "Series", value: "D-Sub, standard density" },
      { label: "Positions", value: "9" },
      { label: "Gender", value: "Male" },
      { label: "Termination", value: "Solder / crimp" },
    ],
    applications: ["Instrumentation", "Control panels", "Telecom equipment"],
    images: [connectors],
    createdAt: "2026-01-10",
  },
  {
    id: "dsub-25-female",
    name: "D-Sub Connector 25 Pin — Female",
    code: "QTC-DS-25F",
    category: "DSUB",
    type: "Connector",
    price: 260,
    availability: "In Stock",
    featured: true,
    shortDescription: "25 pin D-Sub female connector for multi-signal interconnect.",
    description:
      "25 position D-Sub female connector for higher count signal interconnect. Supplied as a component or terminated to customer-specified cable in our assembly facility.",
    specifications: [
      { label: "Series", value: "D-Sub, standard density" },
      { label: "Positions", value: "25" },
      { label: "Gender", value: "Female" },
      { label: "Termination", value: "Solder / crimp" },
    ],
    applications: ["Industrial automation", "Power electronics", "Test equipment"],
    images: [connectors],
    createdAt: "2026-01-12",
  },
  {
    id: "dsub-hood-metal",
    name: "D-Sub Backshell Hood — Metallised",
    code: "QTC-DSA-HD01",
    category: "DSUB Accessories",
    type: "Accessory",
    price: 190,
    availability: "In Stock",
    featured: false,
    shortDescription: "Metallised backshell hood with cable clamp for D-Sub connectors.",
    description:
      "Metallised backshell hood used to protect and strain-relieve terminated D-Sub connectors. Supplied with cable clamp and jack screw hardware.",
    specifications: [
      { label: "Type", value: "Backshell hood" },
      { label: "Finish", value: "Metallised" },
      { label: "Hardware", value: "Cable clamp, jack screws" },
    ],
    applications: ["Harness termination", "Panel interconnect"],
    images: [connectors],
    createdAt: "2026-02-02",
  },
  {
    id: "dsub-jackscrew-set",
    name: "D-Sub Jack Screw & Hardware Set",
    code: "QTC-DSA-JS02",
    category: "DSUB Accessories",
    type: "Accessory",
    price: 60,
    availability: "In Stock",
    featured: false,
    shortDescription: "Mounting hardware set for D-Sub connector installations.",
    description:
      "Hardware set comprising jack screws, nuts and washers for securing D-Sub connectors to panels and mating hoods.",
    specifications: [
      { label: "Type", value: "Mounting hardware" },
      { label: "Contents", value: "Jack screws, nuts, washers" },
    ],
    applications: ["Panel mounting", "Field servicing"],
    images: [connectors],
    createdAt: "2026-02-04",
  },
  {
    id: "din-euro-64",
    name: "DIN (EURO) Connector 64 Way",
    code: "QTC-DIN-64",
    category: "DIN (EURO)",
    type: "Connector",
    price: 420,
    availability: "In Stock",
    featured: true,
    shortDescription: "64 way DIN (EURO) connector for backplane and card-edge use.",
    description:
      "DIN (EURO) style 64 way connector used in backplane, card and rack interconnect. Available in male and female variants for board and cable termination.",
    specifications: [
      { label: "Series", value: "DIN 41612 (EURO) style" },
      { label: "Positions", value: "64" },
      { label: "Mounting", value: "Board / cable" },
    ],
    applications: ["Rack systems", "Telecom shelves", "Industrial controllers"],
    images: [connectors],
    createdAt: "2026-01-20",
  },
  {
    id: "din-euro-96",
    name: "DIN (EURO) Connector 96 Way",
    code: "QTC-DIN-96",
    category: "DIN (EURO)",
    type: "Connector",
    price: 560,
    availability: "Contact for Availability",
    featured: false,
    shortDescription: "96 way DIN (EURO) connector for high density backplanes.",
    description:
      "Higher density 96 way DIN (EURO) style connector for backplane assemblies where additional signal capacity is required.",
    specifications: [
      { label: "Series", value: "DIN 41612 (EURO) style" },
      { label: "Positions", value: "96" },
      { label: "Mounting", value: "Board / cable" },
    ],
    applications: ["Backplane assemblies", "Rack interconnect"],
    images: [connectors],
    createdAt: "2026-03-01",
  },
  {
    id: "idc-frc-26",
    name: "IDC (FRC) Connector 26 Way",
    code: "QTC-IDC-26",
    category: "IDC (FRC)",
    type: "Connector",
    price: 95,
    availability: "In Stock",
    featured: false,
    shortDescription: "26 way IDC connector for flat ribbon cable termination.",
    description:
      "Insulation displacement connector for 1.27 mm pitch flat ribbon cable. Terminated on our tooling to consistent, repeatable results.",
    specifications: [
      { label: "Series", value: "IDC / FRC" },
      { label: "Positions", value: "26" },
      { label: "Termination", value: "Insulation displacement" },
    ],
    applications: ["Board-to-board", "Internal equipment wiring"],
    images: [cableAssemblies],
    createdAt: "2026-02-14",
  },
  {
    id: "idc-frc-assembly-40",
    name: "IDC (FRC) Ribbon Cable Assembly 40 Way",
    code: "QTC-IDC-A40",
    category: "IDC (FRC)",
    type: "Cable Assembly",
    price: 780,
    availability: "In Stock",
    featured: true,
    shortDescription: "40 way ribbon cable assembly terminated to customer length.",
    description:
      "Flat ribbon cable assembly with IDC connectors terminated at both ends. Built to customer-specified length, orientation and marking.",
    specifications: [
      { label: "Positions", value: "40" },
      { label: "Cable", value: "Flat ribbon, 1.27 mm pitch" },
      { label: "Length", value: "To customer specification" },
    ],
    applications: ["Equipment internal wiring", "Test rigs"],
    images: [cableAssemblies],
    createdAt: "2026-03-08",
  },
  {
    id: "harting-din-euro-h15",
    name: "HARTING DIN (EURO) Connector",
    code: "QTC-HRT-D15",
    category: "HARTING DIN (EURO)",
    type: "Connector",
    price: null,
    availability: "Contact for Availability",
    featured: false,
    shortDescription: "HARTING DIN (EURO) series connector, supplied to requirement.",
    description:
      "HARTING DIN (EURO) series connector supplied against customer part number and quantity. Contact us with your requirement for availability and pricing.",
    specifications: [
      { label: "Series", value: "HARTING DIN (EURO)" },
      { label: "Supply", value: "Against customer part number" },
    ],
    applications: ["Rack and panel interconnect", "Industrial equipment"],
    images: [connectors],
    createdAt: "2026-03-15",
  },
  {
    id: "custom-harness-multi-branch",
    name: "Custom Multi-Branch Wire Harness",
    code: "QTC-CA-MB01",
    category: "Cable Assemblies",
    type: "Cable Assembly",
    price: null,
    availability: "Contact for Availability",
    featured: true,
    shortDescription: "Custom-built multi-branch harness manufactured to drawing.",
    description:
      "Multi-branch wire harness built to customer drawing, including sleeving, labelling and termination as specified. Manufactured and checked in our facility before dispatch.",
    specifications: [
      { label: "Build", value: "To customer drawing" },
      { label: "Protection", value: "Sleeving / taping as specified" },
      { label: "Marking", value: "As specified" },
    ],
    applications: ["Telecommunications", "Power", "Defense", "Railways"],
    images: [hero, cableAssemblies],
    createdAt: "2026-03-22",
  },
  {
    id: "circular-connector-assembly",
    name: "Circular Connector Cable Assembly",
    code: "QTC-CA-CC02",
    category: "Cable Assemblies",
    type: "Cable Assembly",
    price: 1450,
    availability: "In Stock",
    featured: false,
    shortDescription: "Circular connector assembly with braided screening.",
    description:
      "Screened cable assembly terminated with circular connectors, built to customer length and pin-out. Suitable for equipment interconnect in demanding environments.",
    specifications: [
      { label: "Termination", value: "Circular connectors, both ends" },
      { label: "Screening", value: "Braided" },
      { label: "Length", value: "To customer specification" },
    ],
    applications: ["Instrumentation", "Rolling stock", "Control systems"],
    images: [hero],
    createdAt: "2026-04-02",
  },
  {
    id: "terminal-blocks-others",
    name: "Terminals, Housings & Allied Items",
    code: "QTC-OTH-01",
    category: "Others",
    type: "Component",
    price: null,
    availability: "Contact for Availability",
    featured: false,
    shortDescription: "Allied connectivity components supplied on requirement.",
    description:
      "Terminals, housings, sleeving and allied connectivity items supplied alongside our harness and connector range. Share your requirement and we will revert with availability.",
    specifications: [{ label: "Supply", value: "Against customer requirement" }],
    applications: ["Harness manufacturing", "Maintenance and spares"],
    images: [connectors],
    createdAt: "2026-04-10",
  },
];
