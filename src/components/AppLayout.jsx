import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ErrorBoundary from "./ErrorBoundary";

export default function AppLayout() {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      {open && <Sidebar />}
      <div style={{ flex: 1, minWidth: 0 }}>
        <Navbar onMenuClick={() => setOpen((o) => !o)} />
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
}