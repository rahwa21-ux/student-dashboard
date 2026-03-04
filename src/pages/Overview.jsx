import React from "react";
import QuickStats from "../components/QuickStats";
import SubjectProgress from "../components/SubjectProgress";
import RecentActivity from "../components/RecentActivity";
import UpcomingDeadlines from "../components/UpcomingDeadlines";
import QuickActions from "../components/QuickActions";
import DailyStudyGoal from "../components/DailyStudyGoal";
import PerformanceChart from "../components/PerformanceChart";
import RecommendedContent from "../components/RecommendedContent";
import HelpSupportCard from "../components/HelpSupportCard";

function Overview() {
  return (
    <div>
      <QuickStats />

      <div className="content-grid">
        <div className="left-column">
          <SubjectProgress />
          <RecentActivity />
        </div>

        <div className="right-column">
          <UpcomingDeadlines />
          <QuickActions />
          <DailyStudyGoal />
        </div>
      </div>

      <div className="bottom-section">
        <PerformanceChart />
        <RecommendedContent />
        <HelpSupportCard />
      </div>
    </div>
  );
}

export default Overview;
