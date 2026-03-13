export default function FinanceKPICards({ accounts }) {
  const totalBalance = accounts.reduce(
    (sum, a) => sum + a.balance,
    0
  );

  const totalCollected = accounts.reduce(
    (sum, a) => sum + a.totalPaid,
    0
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card title="Total Collected" value={totalCollected} green />
      <Card title="Outstanding Balance" value={totalBalance} red />
      <Card title="Total Students" value={accounts.length} />
    </div>
  );
}

function Card({ title, value, green, red }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p
        className={`text-lg font-semibold ${
          green ? "text-green-600" : ""
        } ${red ? "text-red-600" : ""}`}
      >
        ₹{value}
      </p>
    </div>
  );
}