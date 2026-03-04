"use client";
import { useState, useEffect } from "react";
import { FileText, FileVideo, ExternalLink } from "lucide-react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";

export default function ResourcesPage({ selectedGradeId }) {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch all resources
  useEffect(() => {
    fetch("/api/resources")
      .then((res) => res.json())
      .then(setResources)
      .catch(console.error);
  }, []);

  // Filter resources by selected grade
  useEffect(() => {
    if (selectedGradeId) {
      setFilteredResources(
        resources.filter((r) => r.gradeId === selectedGradeId),
      );
    } else {
      setFilteredResources(resources);
    }
  }, [resources, selectedGradeId]);

  // Helper to choose icon based on resource type
  const getIcon = (type) => {
    if (type === "pdf") return <FileText size={20} />;
    if (type === "video") return <FileVideo size={20} />;
    return <ExternalLink size={20} />;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Topbar */}
      <Topbar
        setOpen={setSidebarOpen}
        selectedGradeId={selectedGradeId}
        setSelectedGradeId={() => {}}
      />

      {/* Main Content */}
      <main className="md:ml-64 mt-16 p-6 md:p-8">
        <h2 className="text-2xl font-semibold mb-6">Resources</h2>

        {filteredResources.length === 0 ? (
          <p className="text-gray-400">
            No resources available for this grade.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <a
                key={res.id}
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-700 rounded-lg flex items-center justify-center">
                    {getIcon(res.type)}
                  </div>
                  <h3 className="font-semibold text-lg">{res.title}</h3>
                </div>
                <p className="text-sm text-gray-300">{res.description}</p>
                {res.isNew && (
                  <span className="self-start px-2 py-1 text-xs bg-indigo-500 rounded-full font-semibold">
                    New
                  </span>
                )}
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
