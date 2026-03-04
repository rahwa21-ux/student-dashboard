import { FaClock, FaStar, FaFire, FaBookOpen } from "react-icons/fa";
import QuickStatsCard from "./QuickStatsCard";

export default function QuickStats() {
  const stats = [
    {
      title: "Study Hours",
      value: "72h",
      text: "Total monthly hours",
      icon: <FaClock size={22} />,
      bgClass: "from-blue-400 to-blue-600",
    },
    {
      title: "Average Score",
      value: "89%",
      text: "Overall score",
      icon: <FaStar size={22} />,
      bgClass: "from-green-400 to-green-600",
    },
    {
      title: "Learning Streak",
      value: "12 Days",
      text: "In a row",
      icon: <FaFire size={22} />,
      bgClass: "from-purple-400 to-purple-600",
    },
    {
      title: "Subjects Done",
      value: "5",
      text: "Completed subjects",
      icon: <FaBookOpen size={22} />,
      bgClass: "from-orange-400 to-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((item) => (
        <QuickStatsCard key={item.title} {...item} />
      ))}
    </div>
  );
}
