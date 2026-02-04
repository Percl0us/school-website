export default function FeeSummary({
  monthlyTuition,
  monthlyTransport,
  monthlyTotal,
  balance,
  applicableMonths,
  applicableMonthsLabel,
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="font-semibold mb-3">Fee Summary</h2>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>Monthly Tuition Fee</div>
        <div className="text-right">₹{monthlyTuition}</div>

        <div>Monthly Transport Fee</div>
        <div className="text-right">₹{monthlyTransport}</div>

        <div className="font-medium">Monthly Total</div>
        <div className="text-right font-medium">₹{monthlyTotal}</div>

        <div className="font-semibold pt-2">Outstanding</div>
        <div
          className={`text-right font-semibold pt-2 ${
            balance === 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          ₹{balance}
        </div>
      </div>
      <div className="text-xs text-gray-500 mb-3">
        Applicable months: {applicableMonthsLabel} ({applicableMonths} months)
      </div>
    </div>
  );
}
