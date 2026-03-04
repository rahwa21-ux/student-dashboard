"use client";
import { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children, topbarProps }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="flex-1 flex flex-col md:ml-64">
        <Topbar setOpen={setOpen} {...topbarProps} />
        <button
          className="md:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-md"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} />
        </button>
        <main className="flex-1 pt-20 px-4 md:px-6 bg-gray-50">{children}</main>
        {/* Footer can stay here */}
      </div>
    </div>
  );
}
