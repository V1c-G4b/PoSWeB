// Sidebar.jsx
import { NavLink } from "react-router-dom";

import {Home, MenuSquare, Phone} from "lucide-react"

import logoPOS from "../assets/logoPOS.png"

export function SideBar() {
  const navItems = [
    { name: "Home", href: "/", icon: <Home/> },
    { name: "About", href: "/about", icon: <MenuSquare/> },
    { name: "Contact", href: "/contact", icon: <Phone/> },
  ];

  return (
    <div className="min-h-screen w-32 bg-white text-slate-700 sticky top-0">
    <div className="relative p-5">
      <img src={logoPOS} alt="Logo" className="h-16 w-16 mx-auto rounded-full shadow-sm" />
      <div className="absolute inset-0 rounded-full">
        </div>
    </div>

      <ul className="space-y-2 p-5">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `flex items-center justify-center space-x-2 p-2 rounded-md border border-r-0 border-l-0 border-b-0 border-t-0 hover:border-r-2 hover:border-r-orange-400 ${
                  isActive ? "border-r-orange-400 border-r-2" : ""
                }`
              }
            >
              <span>{item.icon}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
