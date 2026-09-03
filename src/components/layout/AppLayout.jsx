import { useLocation } from "react-router-dom";
import Navbar from "../common/Navbar";
import BottomNav from "../common/BottomNav";
import Footer from "../common/Footer";

/**
 * Ortak kabuk: sabit üst bar, mobilde alt sekme çubuğu ve alt bilgi.
 * `key={pathname}` sayfa değişiminde giriş animasyonunu yeniden tetikler.
 */
const AppLayout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />

      {/* pt-24: sabit üst bar payı */}
      <main key={pathname} className="flex-1 animate-fade-in pt-24">
        {children}
      </main>

      <Footer />

      {/* Mobilde alt sekme çubuğunun içeriği kapatmaması için boşluk */}
      <div className="h-24 md:hidden" aria-hidden="true" />

      <BottomNav />
    </div>
  );
};

export default AppLayout;
