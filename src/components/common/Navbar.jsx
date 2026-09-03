import { NavLink } from "react-router-dom";
import { navLinks } from "../../data/navigation";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl dark:border-white/5 dark:bg-night-900/70">
      <nav
        aria-label="Ana menü"
        className="app-container flex h-16 items-center justify-between gap-3"
      >
        <NavLink
          to="/"
          className="flex items-center gap-2.5 rounded-2xl"
          aria-label="Eros App ana sayfa"
        >
          <img
            src="/favicon.svg"
            alt=""
            className="h-9 w-9 rounded-2xl shadow-glow"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold text-ink-800 dark:text-ink-50">
              Eros
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-500">
              Toy Poodle
            </span>
          </span>
        </NavLink>

        {/* Masaüstü menüsü — mobilde yerini alt sekme çubuğu alır */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-2xl px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                    : "text-ink-500 hover:bg-ink-50 hover:text-ink-700 dark:text-ink-300 dark:hover:bg-white/5 dark:hover:text-ink-50"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
