import Link from "next/link";
import { brandName, navigationLinks } from "@/data/navigation";
import { socialLinks } from "@/data/socialLinks";

export default function Navigation() {
  return (
    <nav className="flex flex-wrap lg:grid lg:grid-cols-3 items-center justify-between gap-y-2 w-full">
      {/* Left — Brand name */}
      <div className="justify-self-start">
        <Link
          href="/"
          className="text-base lg:text-lg font-normal text-text-primary tracking-tight"
        >
          {brandName}
        </Link>
      </div>

      {/* Center — Navigation links */}
      <ul className="justify-self-center hidden sm:flex items-center gap-6 lg:gap-8">
        {navigationLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm lg:text-lg font-normal text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right — Social links */}
      <ul className="justify-self-end flex items-center gap-4 lg:gap-6">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-xs lg:text-lg font-bold text-text-primary transition-colors hover:text-accent-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
