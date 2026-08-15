export interface NavLink {
  label: string;
  href: string;
}

export const brandName = "Riki Andika";

export const navigationLinks: NavLink[] = [
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Credentials", href: "/credentials" },
  { label: "Contacts", href: "#contacts" },
];
