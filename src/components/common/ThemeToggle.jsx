import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Açık temaya geç" : "Koyu temaya geç"}
      title={isDark ? "Açık tema" : "Koyu tema"}
      className={`relative grid h-10 w-10 place-items-center rounded-2xl border border-ink-100
                  bg-white/70 text-ink-500 transition-all duration-200 hover:bg-white
                  hover:text-brand-600 active:scale-95 dark:border-white/10
                  dark:bg-white/5 dark:text-ink-300 dark:hover:bg-white/10 ${className}`}
    >
      {/* İki ikon üst üste durur; sadece opaklık/dönüş değişir */}
      <Sun
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
