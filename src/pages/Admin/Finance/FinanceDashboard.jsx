import { useState } from "react";
import PendingTab from "./PendingTab";
import OverviewTab from "./OverviewTab";

export default function FinanceDashboard() {
  const [activeTab, setActiveTab] = useState("PENDING");

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">
        Finance
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab("PENDING")}
          className={`pb-2 ${
            activeTab === "PENDING"
              ? "border-b-2 border-blue-700 font-medium"
              : "text-gray-500"
          }`}
        >
          Pending
        </button>

        <button
          onClick={() => setActiveTab("OVERVIEW")}
          className={`pb-2 ${
            activeTab === "OVERVIEW"
              ? "border-b-2 border-blue-700 font-medium"
              : "text-gray-500"
          }`}
        >
          Overview
        </button>
      </div>

      {activeTab === "PENDING" && <PendingTab />}
      {activeTab === "OVERVIEW" && <OverviewTab />}
    </div>
  );
}