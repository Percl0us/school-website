export default function FinanceSummary({
  feeAccount,
}) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-white p-4 shadow rounded">
        <p className="text-sm text-gray-500">
          Total Fee
        </p>
        <p className="text-lg font-semibold">
          ₹{feeAccount.totalFee}
        </p>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <p className="text-sm text-gray-500">
          Total Paid
        </p>
        <p className="text-lg font-semibold text-green-600">
          ₹{feeAccount.totalPaid}
        </p>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <p className="text-sm text-gray-500">
          Balance
        </p>
        <p className="text-lg font-semibold text-red-600">
          ₹{feeAccount.balance}
        </p>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <p className="text-sm text-gray-500">
          Status
        </p>
        <p className="text-lg font-semibold">
          {feeAccount.status}
        </p>
      </div>
    </div>
  );
}