import cableAssemblies from "@/assets/cable-assemblies.jpg";
import connectors from "@/assets/connectors.jpg";
import hero from "@/assets/hero-harness.jpg";
import telecom from "@/assets/ind-telecom.jpg";
import defense from "@/assets/ind-defense.jpg";

export const categories = [
  "Antennas",
  "Connectors",
  "Cables",
  "Fiber Optics",
  "Cable Assemblies",
  "DSUB",
  "DIN (EURO)",
  "IDC (FRC)",
  "HARTING DIN (EURO)",
  "Others",
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

export const seedProducts: Product[] = [
  /* ------------------- ANTENNAS (User Requested Products) ------------------- */
  {
    id: "gnss-external-antenna",
    name: "GNSS Full-Coverage External Antenna with LNA",
    code: "QTC-ANT-GNSS01",
    category: "Antennas",
    type: "Antenna Solution",
    price: 2450,
    availability: "In Stock",
    featured: true,
    shortDescription:
      "Single, dual, and tri-band full-coverage GNSS external antenna with built-in high-gain LNA and waterproof housing.",
    description:
      "Whether you require single-band, dual-band, or tri-band full-coverage GNSS capabilities, our range offers a multitude of sleek and functional designs to suit your specific needs. Antennas in this series feature built-in high-gain LNA (Low Noise Amplifier) to enhance signal reception, ensuring stable and precise positioning even in challenging environments. Our antennas come with a variety of connectors for easy integration with your devices, providing flexibility and compatibility.",
    specifications: [
      { label: "Band Coverage", value: "Single-Band / Dual-Band / Tri-Band GNSS" },
      { label: "LNA Amplifier", value: "Built-in High-Gain Low Noise Amplifier (LNA)" },
      { label: "Weatherproofing", value: "Waterproof IP67 / IP68 Rated Robust Construction" },
      { label: "Installation", value: "Simple screw / magnetic / adhesive mount" },
      { label: "Commonly Used Cables", value: "RG174, RG316, RG58, LMR200, ALSR100" },
      { label: "Connector Options", value: "SMA, SMB, Type-N, TNC, BNC, MCX, MMCX" },
      { label: "Customization", value: "Custom Cable Lengths, Connector Combinations & Enclosures" },
    ],
    applications: [
      "Communications — Wireless Connection",
      "Consumers — Outdoor Sports & Fitness Devices",
      "Industrial & Instrumentation — Remote Asset Tracking",
      "Automotive — High-Precision Positioning",
      "EV Charging — Positioning & Geofencing for Charging Networks",
    ],
    images: [telecom, connectors],
    createdAt: "2026-04-15",
  },
  {
    id: "5g-lte-puck-antenna",
    name: "5G / LTE Multi-Band Rugged Puck Antenna",
    code: "QTC-ANT-5G02",
    category: "Antennas",
    type: "Antenna Solution",
    price: 3200,
    availability: "In Stock",
    featured: true,
    shortDescription: "Vandal-resistant IP68 external puck antenna for 5G, 4G/LTE, and CBRS telematics gateways.",
    description:
      "Compact, heavy-duty omnidirectional external antenna engineered for harsh outdoor telematics, smart city kiosks, and smart utility meters. Features high gain across 600MHz to 6GHz spectrum with low VSWR and optional integrated GNSS/Wi-Fi elements.",
    specifications: [
      { label: "Frequency Range", value: "600 MHz – 6000 MHz (5G / 4G LTE / CBRS)" },
      { label: "Peak Gain", value: "4.5 dBi" },
      { label: "Ingress Rating", value: "IP68 & IK09 Impact Resistant" },
      { label: "Cable / Connectors", value: "Low-loss RG58 / LMR200 with SMA Male (customizable)" },
    ],
    applications: [
      "EV Charging Stations & Geofencing",
      "Smart City Infrastructure & Traffic Telemetry",
      "Automotive Fleet Tracking & Telematics",
    ],
    images: [telecom],
    createdAt: "2026-04-16",
  },

  /* ------------------- FIBER OPTICS ------------------- */
  {
    id: "fiber-mpo-trunk-cable",
    name: "High-Density MPO/MTP 12/24 Fiber Optic Trunk Cable",
    code: "QTC-FO-MPO12",
    category: "Fiber Optics",
    type: "Fiber Optic Assembly",
    price: 4800,
    availability: "In Stock",
    featured: true,
    shortDescription: "Ultra-low loss factory-terminated OM4 / OS2 MPO trunk cable for data centers and telecom.",
    description:
      "Precision factory-terminated and 100% interferometrically tested MPO/MTP trunk cables. Built with bend-insensitive optical fibers and low-loss push-pull connectors for high-density interconnect applications.",
    specifications: [
      { label: "Fiber Count", value: "12 / 24 Fibers (OM4 Multimode / OS2 Singlemode)" },
      { label: "Connector Type", value: "MPO / MTP Female / Male with low insertion loss (<0.35dB)" },
      { label: "Jacket Rating", value: "LSZH / Plenum / Riser (CPR compliant)" },
      { label: "Testing", value: "100% End-face Geometry & Insertion/Return Loss Verified" },
    ],
    applications: [
      "Telecommunications Base Stations",
      "High-Speed Data Centers & Server Racks",
      "Switchgear Optical Monitoring",
    ],
    images: [cableAssemblies],
    createdAt: "2026-04-18",
  },
  {
    id: "fiber-duplex-lc-sc-patch",
    name: "Duplex LC-SC Armored Fiber Patch Cord",
    code: "QTC-FO-LCSC",
    category: "Fiber Optics",
    type: "Fiber Optic Assembly",
    price: 850,
    availability: "In Stock",
    featured: false,
    shortDescription: "Stainless steel flexible armored duplex optical patch cord for industrial environments.",
    description:
      "Ruggedized optical patch cord featuring an internal spiral stainless steel armor layer that protects fragile glass fibers from crushing, rodent damage, and high tensile loads in industrial cabinet routing.",
    specifications: [
      { label: "Connectors", value: "LC Duplex to SC Duplex (UPC / APC polish)" },
      { label: "Armor", value: "Flexible spiral stainless steel tube" },
      { label: "Wavelength", value: "850nm / 1310nm / 1550nm" },
    ],
    applications: [
      "Industrial Ethernet & Process Automation",
      "Defense & Naval Communication Links",
      "Substation Relaying Systems",
    ],
    images: [cableAssemblies],
    createdAt: "2026-04-19",
  },

  /* ------------------- CABLES & WIRE HARNESSES ------------------- */
  {
    id: "custom-harness-multi-branch",
    name: "Custom Multi-Branch Wire Harness",
    code: "QTC-CA-MB01",
    category: "Cables",
    type: "Cable Assembly",
    price: null,
    availability: "Contact for Availability",
    featured: true,
    shortDescription: "Custom-built multi-branch harness manufactured to drawing with full pin-out testing.",
    description:
      "Multi-branch wire harness built to customer drawing, including sleeving, labelling, taping, and termination as specified. Manufactured on 1:1 scaled layout boards and 100% checked in our facility before dispatch.",
    specifications: [
      { label: "Build", value: "To customer mechanical & electrical drawing" },
      { label: "Protection", value: "Braided sleeving / conduit / PVC taping as specified" },
      { label: "Marking", value: "Laser wire printing & thermal shrink sleeves" },
      { label: "Testing", value: "100% automated continuity & pin-out verification" },
    ],
    applications: [
      "Telecommunications Network Racks",
      "Power Distribution & Switchboards",
      "Defense & Aerospace Cabinets",
      "Railways Rolling Stock Signalling",
    ],
    images: [hero, cableAssemblies],
    createdAt: "2026-03-22",
  },
  {
    id: "high-flex-drag-chain-cable",
    name: "High-Flex Shielded Industrial Drag Chain Cable Assembly",
    code: "QTC-CAB-DRAG01",
    category: "Cables",
    type: "Cable Assembly",
    price: 1850,
    availability: "In Stock",
    featured: false,
    shortDescription: "Continuous flexing multi-conductor shielded cable for CNC machinery and robotic tracks.",
    description:
      "Engineered for millions of continuous bending cycles in drag chains and robotic automation tracks. Tinned copper braided shielding provides exceptional EMI resistance against high-power drive interference.",
    specifications: [
      { label: "Flex Life", value: "> 5 Million Continuous Bending Cycles" },
      { label: "Shielding", value: "Tinned Copper Braid (>85% optical coverage)" },
      { label: "Jacket Material", value: "Oil-resistant, Flame-retardant PUR" },
    ],
    applications: [
      "Robotics & Pick-and-Place Actuators",
      "CNC Milling & Laser Cutting Machines",
      "Automated Factory Conveyors",
    ],
    images: [cableAssemblies],
    createdAt: "2026-04-20",
  },

  /* ------------------- CONNECTORS & HARDWARE ------------------- */
  {
    id: "dsub-9-male",
    name: "D-Sub Connector 9 Pin — Male",
    code: "QTC-DS-09M",
    category: "Connectors",
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
    category: "Connectors",
    type: "Connector",
    price: 260,
    availability: "In Stock",
    featured: false,
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
    id: "din-euro-64",
    name: "DIN (EURO) 41612 Connector 64 Way",
    code: "QTC-DIN-64",
    category: "Connectors",
    type: "Connector",
    price: 420,
    availability: "In Stock",
    featured: true,
    shortDescription: "64 way DIN (EURO) connector for backplane and card-edge rack use.",
    description:
      "DIN (EURO) style 64 way connector used in backplane, card, and rack interconnect. Available in male and female variants for board and cable termination.",
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
    id: "harting-din-euro-h15",
    name: "HARTING Heavy-Duty & DIN Modular Series",
    code: "QTC-HRT-MOD01",
    category: "Connectors",
    type: "Connector",
    price: null,
    availability: "Contact for Availability",
    featured: false,
    shortDescription: "HARTING series industrial connectors supplied against part numbers.",
    description:
      "HARTING modular and DIN series connectors supplied against customer bill of materials. Contact our sales desk with your part numbers for immediate stock check and pricing.",
    specifications: [
      { label: "Series", value: "HARTING Han / DIN Modular" },
      { label: "Supply", value: "Against customer OEM part number" },
    ],
    applications: ["High-power industrial cabinets", "Railway propulsion units"],
    images: [connectors],
    createdAt: "2026-03-15",
  },
  {
    id: "idc-frc-assembly-40",
    name: "IDC (FRC) Ribbon Cable Assembly 40 Way",
    code: "QTC-IDC-A40",
    category: "Cables",
    type: "Cable Assembly",
    price: 780,
    availability: "In Stock",
    featured: false,
    shortDescription: "40 way flat ribbon cable assembly terminated to customer length.",
    description:
      "Flat ribbon cable assembly with IDC connectors terminated on dedicated tooling. Built to customer-specified length, polarity orientation, and strain-relief marking.",
    specifications: [
      { label: "Positions", value: "40" },
      { label: "Cable", value: "Flat ribbon, 1.27 mm pitch" },
      { label: "Length", value: "To customer specification" },
    ],
    applications: ["Equipment internal wiring", "Test rigs & PCB links"],
    images: [cableAssemblies],
    createdAt: "2026-03-08",
  },
  {
    id: "circular-connector-assembly",
    name: "Mil-Spec Circular Connector Screened Cable Assembly",
    code: "QTC-CA-CC02",
    category: "Cables",
    type: "Cable Assembly",
    price: 1450,
    availability: "In Stock",
    featured: false,
    shortDescription: "Circular connector assembly with braided EMI screening.",
    description:
      "Screened cable assembly terminated with circular connectors, built to customer length and pin-out. Engineered for high vibration and demanding environmental duty.",
    specifications: [
      { label: "Termination", value: "Circular connectors, both ends" },
      { label: "Screening", value: "Braided tinned copper shield" },
      { label: "Length", value: "To customer specification" },
    ],
    applications: ["Instrumentation", "Rolling stock", "Defense control systems"],
    images: [hero, defense],
    createdAt: "2026-04-02",
  },
];
