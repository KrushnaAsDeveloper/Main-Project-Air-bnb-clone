import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faCloudSun } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `relative pb-0.5 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-rose-400 after:transition-all after:duration-300 ${
      isActive
        ? "text-rose-400 after:w-full"
        : "text-white/80 hover:text-white after:w-0 hover:after:w-full"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-rose-500/20 text-rose-400"
        : "text-white/70 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <nav className="w-full bg-zinc-950/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-white font-bold text-xl tracking-tight shrink-0 hover:opacity-90 transition-opacity"
        >
          <FontAwesomeIcon icon={faCloudSun} className="text-rose-400 text-lg" />
          cosy<span className="text-rose-400">cloud</span>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Listings
            </NavLink>
          </li>
          <li>
            <NavLink to="/listings/new" className={navLinkClass}>
              Create Listing
            </NavLink>
          </li>
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <NavLink
            to="/login"
            className="text-white/80 hover:text-white text-sm font-medium transition-colors"
          >
            Log in
          </NavLink>
          <NavLink
            to="/signup"
            className="bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-200"
          >
            Sign up
          </NavLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white/80 hover:text-white w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className="text-lg" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-1 flex flex-col gap-1 border-t border-white/10">
          <NavLink to="/" className={mobileNavLinkClass} onClick={() => setMenuOpen(false)}>
            Listings
          </NavLink>
          <NavLink to="/listings/new" className={mobileNavLinkClass} onClick={() => setMenuOpen(false)}>
            Create Listing
          </NavLink>
          <div className="border-t border-white/10 mt-2 pt-3 flex flex-col gap-1">
            <NavLink to="/login" className={mobileNavLinkClass} onClick={() => setMenuOpen(false)}>
              Log in
            </NavLink>
            <NavLink
              to="/signup"
              className="block px-4 py-3 rounded-xl text-sm font-medium bg-rose-500 hover:bg-rose-600 text-white transition-colors text-center"
              onClick={() => setMenuOpen(false)}
            >
              Sign up
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
