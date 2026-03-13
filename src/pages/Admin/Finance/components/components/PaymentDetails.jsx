export default function PaymentDetails({ payments, onPreview }) {
  if (!payments || payments.length === 0) {
    return <div className="text-gray-400 text-sm">No payments recorded.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {payments.map((p) => (
        <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="font-bold text-gray-900">₹{p.amount.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">
            {p.mode} • {new Date(p.createdAt).toLocaleDateString()}
          </div>
          <div className="mt-2">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              p.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
              p.status === "PAYMENT_SUBMITTED" ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"
            }`}>
              {p.status}
            </span>
          </div>
          <div className="text-xs text-gray-600 mt-2">UTR: {p.utrNumber || "N/A"}</div>
          {p.monthsCovered && (
            <div className="text-xs text-gray-600">Months: {p.monthsCovered.join(", ")}</div>
          )}
          {p.screenshotUrl && (
            <div className="mt-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); onPreview(p.screenshotUrl); }}>
              <img src={p.screenshotUrl} alt="Proof" className="h-20 w-20 object-cover rounded-lg border border-gray-200 hover:opacity-80 transition" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}