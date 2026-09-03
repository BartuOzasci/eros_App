import { Heart } from "lucide-react";
import { getCurrentYear } from "../../utils/dateHelpers";

const Footer = () => (
  <footer className="app-container mt-12 pb-4 text-center">
    <div className="mx-auto flex max-w-xs items-center justify-center gap-2 border-t border-ink-100 pt-6 text-xs text-ink-400 dark:border-white/5 dark:text-ink-500">
      <span>Eros App · {getCurrentYear()}</span>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1">
        <Heart className="h-3.5 w-3.5 fill-blush-400 text-blush-400" />
        ile yapıldı
      </span>
    </div>
  </footer>
);

export default Footer;
