import { useState } from "react";
import { navLinks } from "../data/dummyData";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass" id="navbar">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Navigasi utama"
      >
        {/* Logo */}
        <a
          href="#beranda"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-tight"
          id="nav-logo"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary-600 to-primary-800 text-white text-lg shadow-lg shadow-primary-500/30">
            M
          </span>
          <span className="gradient-text">MAPAN</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <a
                href={link.href}
                role="menuitem"
                className="relative px-4 py-2 text-sm font-medium text-surface-600 rounded-lg transition-colors duration-200 hover:text-primary-600 hover:bg-primary-50"
                id={`nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            className="hidden md:inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-primary-600 to-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 active:translate-y-0"
            id="nav-cta-masuk"
          >
            Masuk
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex md:hidden items-center justify-center rounded-lg p-2 text-surface-500 hover:bg-surface-100 transition-colors"
            aria-label="Buka menu navigasi"
            aria-expanded={mobileOpen}
            id="nav-mobile-toggle"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        id="nav-mobile-menu"
      >
        <ul className="space-y-1 px-4 pb-4 pt-1" role="menu">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <a
                href={link.href}
                role="menuitem"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-surface-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li role="none">
            <button className="mt-2 w-full rounded-xl bg-linear-to-r from-primary-600 to-primary-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25">
              Masuk
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
