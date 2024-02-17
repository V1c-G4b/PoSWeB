import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Menu, MenuSquare, Phone, X } from "lucide-react"; // Importando o ícone X para fechamento
import logoPOS from "../assets/logoPOS.png";
import useWindowDimensions from "../hooks/screenSize";

export function SideBar() {
  const { width } = useWindowDimensions();

  const [isSidebarOpen, setIsSidebarOpen] = useState(
    width > 720 ? true : false
  );
  const navItems = [
    { name: "Home", href: "/sale", icon: <Home /> },
    { name: "About", href: "/about", icon: <MenuSquare /> },
    { name: "Contact", href: "/contact", icon: <Phone /> },
  ];

  return (
    <>
      <button
        className={`fixed z-40 top-4 ${
          isSidebarOpen ? "left-32 md:left-[calc(15%-8rem)]" : "left-4"
        } bg-orange-500 text-white p-2 rounded-full transition-all duration-300 ease-in-out`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      <div
        className={`fixed z-30 min-h-screen w-32 bg-white text-slate-700 top-0 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative p-5">
          <img
            src={logoPOS}
            alt="Logo"
            className="h-16 w-16 mx-auto rounded-full shadow-sm"
          />
        </div>

        <ul className="space-y-2 p-5">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center justify-center p-2 rounded-md hover:bg-gray-100 ${
                    isActive ? "bg-gray-200" : ""
                  }`
                }
              >
                {item.icon}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
