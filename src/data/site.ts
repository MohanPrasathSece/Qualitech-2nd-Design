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
  { label: "About Us", to: "/about" },
  { label: "Solutions", to: "/solutions" },
  { label: "Facilities", to: "/facilities" },
  { label: "Products", to: "/products" },
  { label: "Industries", to: "/industries" },
  { label: "Contact", to: "/contact" },
] as const;

export const stats = [
  { value: 1995, suffix: "", label: "Established" },
  { value: 30, suffix: "+", label: "Years of Experience" },
  { value: 0, literal: "OEM", label: "Focused Solutions" },
  { value: 4, suffix: "+", label: "Key Industries" },
] as const;

export const industries = [
  {
    slug: "telecommunications",
    name: "Telecommunications",
    note: "Signal-critical harnesses and interconnects for network and transmission equipment.",
  },
  {
    slug: "power",
    name: "Power",
    note: "Harnessing and connector solutions for power distribution and control panels.",
  },
  {
    slug: "defense",
    name: "Defense",
    note: "Application-specific assemblies built to customer drawings and specifications.",
  },
  {
    slug: "railways",
    name: "Railways",
    note: "Durable cable assemblies for rolling stock and signalling applications.",
  },
] as const;

export const whyQualitech = [
  {
    title: "Application-Specific",
    body: "Solutions designed around individual requirements.",
  },
  { title: "Quality Focused", body: "Reliable products for demanding applications." },
  { title: "Experienced Team", body: "Decades of engineering and industry experience." },
  { title: "Competitive Solutions", body: "Optimized resources without compromising quality." },
  { title: "Timely Supply", body: "Focused on dependable and consistent delivery." },
] as const;

export const companyCopy = [
  "Qualitech was established in 1995 by a team of dedicated professionals. Having successfully managed the company for decades, Qualitech has grown into a leading provider of high quality custom built wire and cable harnesses to OEMs.",
  "The right combination of dedicated and excellent manpower along with the latest technology is not only helping the company provide highly reliable cable harnesses but also helping in resource optimization, thus resulting in the best buy for our esteemed customers.",
  "Our diversified clientele also establishes our strength in supplying application specific and customized products inline with individual needs, covering major sectors such as Telecommunications, Power, Defense and Railways.",
  "Providing high quality harnesses at competitive prices and timely supplies has been Qualitech's motto, which has helped the company grow from strength to strength.",
];
