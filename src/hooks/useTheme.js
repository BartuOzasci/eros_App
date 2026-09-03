import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "eros-theme";

/** localStorage kapalıysa (gizli sekme vb.) sistem tercihine düşer. */
const readStoredTheme = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    /* erişilemiyorsa yok say */
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

/**
 * Açık/koyu tema durumunu yönetir ve <html> üzerindeki `dark` sınıfını günceller.
 * İlk boyama index.html'deki inline script tarafından yapılır, bu hook devamını üstlenir.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* kaydedilemezse oturum boyunca geçerli olur */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme, isDark: theme === "dark" };
};
