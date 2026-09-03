import { Link } from "react-router-dom";
import { Home, PawPrint } from "lucide-react";

const NotFound = () => (
  <div className="app-container flex min-h-[55vh] flex-col items-center justify-center text-center">
    <span className="grid h-20 w-20 place-items-center rounded-4xl bg-brand-gradient text-white shadow-lift animate-float">
      <PawPrint className="h-10 w-10" strokeWidth={2} />
    </span>

    <h1 className="mt-6 font-display text-5xl font-bold text-gradient">404</h1>

    <p className="mt-2 font-display text-lg font-bold text-ink-800 dark:text-ink-50">
      Eros bu sayfayı bulamadı
    </p>
    <p className="mt-1.5 max-w-xs text-sm text-ink-400 dark:text-ink-400">
      Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.
    </p>

    <Link to="/" className="btn-primary mt-6">
      <Home className="h-4 w-4" />
      Ana sayfaya dön
    </Link>
  </div>
);

export default NotFound;
