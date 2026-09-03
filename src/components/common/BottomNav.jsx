import { NavLink } from "react-router-dom";
import { navLinks } from "../../data/navigation";

/**
 * Mobilde hamburger menü yerine, tek elle erişilebilen alt sekme çubuğu.
 * Uygulama hissi verir ve aktif sayfa her zaman görünür kalır.
 */
const BottomNav = () => {
  return (
    <nav
      aria-label="Alt menü"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/60 bg-white/85
                 pb-safe backdrop-blur-xl md:hidden dark:border-white/5 dark:bg-night-900/85"
    >
      <ul className="mx-auto flex max-w-xl items-stretch justify-around px-2 py-1.5">
        {navLinks.map((link) => {
          const Icon = link.icon;

          return (
            <li key={link.path} className="flex-1">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `group relative flex flex-col items-center gap-1 rounded-2xl px-1 py-2
                   text-[11px] font-semibold transition-colors duration-200 ${
                     isActive
                       ? "text-brand-600 dark:text-brand-300"
                       : "text-ink-400 hover:text-ink-600 dark:text-ink-400 dark:hover:text-ink-200"
                   }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`grid h-9 w-14 place-items-center rounded-2xl transition-all duration-300 ${
                        isActive
                          ? "bg-brand-100 dark:bg-brand-500/15"
                          : "bg-transparent"
                      }`}
                    >
                      <Icon
                        className={`h-[19px] w-[19px] transition-transform duration-300 ${
                          isActive ? "scale-110" : "group-active:scale-90"
                        }`}
                        strokeWidth={isActive ? 2.4 : 2}
                      />
                    </span>
                    {link.short}
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;
