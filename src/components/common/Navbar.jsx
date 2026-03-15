import { NavLink } from "react-router-dom";
import { Menu, X, PawPrint } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Hakkımda", path: "/" },
    { name: "Aşılarım", path: "/vaccines" },
    { name: "Kuaför", path: "/groomer" },
    { name: "İletişim", path: "/contact" },
  ];

  const activeStyle =
    "text-primary font-bold bg-orange-50 rounded-xl px-3 py-2";
  const inactiveStyle =
    "text-textMain hover:bg-orange-50 rounded-xl px-3 py-2 transition-colors";

  return (
    <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-md mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xl font-bold text-orange-400">
          <PawPrint className="w-6 h-6" />
          Eros App
        </div>

        <button
          className="md:hidden text-textMain"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        <div className="hidden md:flex gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-4 py-4 space-y-3 shadow-soft border-t border-gray-100">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
