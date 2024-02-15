// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import { SideBar } from "./components/sideBar";

export function App() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
