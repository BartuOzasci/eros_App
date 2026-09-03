import { Dog, Syringe, Scissors, Phone } from "lucide-react";

/** Üst menü ve mobil alt sekme çubuğu aynı kaynağı kullanır. */
export const navLinks = [
  { name: "Hakkımda", short: "Profil", path: "/", icon: Dog },
  { name: "Aşılarım", short: "Aşılar", path: "/vaccines", icon: Syringe },
  { name: "Kuaför", short: "Kuaför", path: "/groomer", icon: Scissors },
  { name: "İletişim", short: "İletişim", path: "/contact", icon: Phone },
];
