export const company = {
  name: "Qualitech Connectronics Private Limited",
  short: "Qualitech Connectronics",
  established: 1995,
  phone: "+91-40-27140004",
  fax: "+91-40-27140005",
  email: "info@qualitechindia.in",
  website: "qualitechindia.in",
  address: ["LIG B-279,", "Dr. A S Rao Nagar,", "ECIL Post,", "Hyderabad – 500 062."],
};

export const nav = [
  { label: "Home", to: "/" },
  { label: "Connectors", to: "/products?category=Connectors" },
  { label: "Cables", to: "/products?category=Cables" },
  { label: "Fiber Optics", to: "/products?category=Fiber+Optics" },
  { label: "Antennas", to: "/products?category=Antennas" },
  { label: "Applications", to: "/solutions" },
  { label: "Facilities", to: "/facilities" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
] as const;

export const stats = [
  { value: 1995, suffix: "", label: "Established" },
  { value: 30, suffix: "+", label: "Years Experience" },
  { value: 0, literal: "100%", label: "Tested Zero-Defect" },
  { value: 5, suffix: "+", label: "Key Sectors" },
] as const;

export const industries = [
  {
    slug: "communications",
    name: "Communications & Wireless",
    note: "High-gain GNSS, 5G/LTE telemetry antennas, and fiber optic base station interconnects.",
  },
  {
    slug: "automotive",
    name: "Automotive & EV Charging",
    note: "High-precision positioning, geofencing for charging networks, and rugged engine bay harnesses.",
  },
  {
    slug: "industrial",
    name: "Industrial & Asset Tracking",
    note: "Drag-chain flex cables, sensor interconnects, and remote machine telematics.",
  },
  {
    slug: "telecommunications",
    name: "Telecommunications",
    note: "Signal-critical harnesses and backplane interconnects for transmission racks.",
  },
  {
    slug: "power",
    name: "Power & Energy",
    note: "Harnessing and heavy-duty modular connectors for power distribution and switchgear.",
  },
  {
    slug: "defense",
    name: "Defense & Aerospace",
    note: "Mil-spec circular connector screened assemblies and ruggedized optical links.",
  },
] as const;

export const whyQualitech = [
  {
    title: "Application-Specific",
    body: "Custom RF, fiber, and copper solutions designed around individual OEM engineering requirements.",
  },
  { title: "Quality Focused", body: "100% automated continuity, pin-out, and pull-force verified." },
  { title: "Experienced Team", body: "Over three decades of precision assembly and interconnect manufacturing." },
  { title: "Comprehensive Customization", body: "Flexible cable lengths, jacket materials, and connector configurations." },
  { title: "Timely OEM Supply", body: "Dependable prototyping and high-volume scheduled delivery contracts." },
] as const;

export const companyCopy = [
  "Qualitech Connectronics was established in 1995 by a team of dedicated engineering professionals. Having successfully managed the company for decades, Qualitech has grown into a leading provider of custom built wire and cable harnesses, high-performance antennas, fiber optic assemblies, and specialized connectors to OEMs.",
  "The right combination of dedicated and excellent manpower along with state-of-the-art tooling is not only helping the company provide highly reliable interconnect systems but also assisting in resource optimization, resulting in the best value for our customers.",
  "Our diversified portfolio establishes our strength in supplying application-specific and customized products inline with individual engineering briefs across Communications, Automotive & EV Charging, Industrial Automation, Telecommunications, Power, and Defense.",
  "Providing high quality assemblies at competitive terms and dependable supplies has been Qualitech's guiding principle, driving the company from strength to strength.",
];
