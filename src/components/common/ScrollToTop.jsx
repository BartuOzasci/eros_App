import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Rota değiştiğinde sayfayı başa alır.
 * Aksi halde uzun bir sayfadan geçildiğinde yeni sayfa ortadan açılıyordu.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
