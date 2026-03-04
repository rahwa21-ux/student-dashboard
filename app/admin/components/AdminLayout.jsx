"use client";

import { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const SIDEBAR_WIDTH = "280px";

const AdminLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AdminHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
        />

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 md:px-6 pt-[92px] lg:ml-[280px]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
