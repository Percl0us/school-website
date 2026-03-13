export default function GlobalSummary({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SummaryCard title="Total Students" value={stats.totalStudents} />
      <SummaryCard title="Total Collected" value={`₹${stats.totalCollected.toLocaleString()}`} color="text-green-700" />
      <SummaryCard title="Total Outstanding" value={`₹${stats.totalOutstanding.toLocaleString()}`} color="text-red-700" />
    </div>
  );
}

const SummaryCard = ({ title, value, color = "" }) => (
  <div className="bg-white p-5 rounded-xl shadow">
    <p className="text-xs uppercase text-gray-500 font-bold">{title}</p>
    <p className={`text-2xl font-semibold mt-1 ${color}`}>{value}</p>
  </div>
);