export default function StudentRow({ s, index, isExpanded, onToggle, onManage }) {
  return (
    <tr
      onClick={() => onToggle(s.admissionNo)}
      className={`cursor-pointer transition-colors ${
        isExpanded ? "bg-blue-50/50" : "hover:bg-gray-50"
      }`}
    >
      <td className="p-4 text-center text-gray-400">{index + 1}</td>
      <td className="p-4 font-mono text-xs text-gray-500">{s.admissionNo}</td>
      <td className="p-4">
        <div className="font-medium text-gray-900">{s.name}</div>
        <div className="text-[11px] text-gray-500 mt-0.5">
          <span className="text-gray-400">F:</span> {s.fatherName || "—"}
          <span className="mx-1.5 text-gray-300">|</span>
          <span className="text-gray-400">M:</span> {s.motherName || "—"}
        </div>
      </td>
      <td className="p-4 text-gray-600">{s.class}</td>
      <td className="p-4 font-mono text-gray-600">₹{s.totalFee.toLocaleString()}</td>
      <td className="p-4 font-mono text-green-700 font-medium">₹{s.totalPaid.toLocaleString()}</td>
      <td className="p-4 font-mono text-red-700 font-medium">₹{s.balance.toLocaleString()}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">{s.activeDiscount ? `₹${s.activeDiscount}` : "-"}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onManage(s);
            }}
            className="text-blue-600 hover:underline text-xs font-bold"
          >
            Manage
          </button>
        </div>
      </td>
      <td className="p-4 text-center">
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
          s.computedStatus === "CLEARED" ? "bg-green-100 text-green-700" :
          s.computedStatus === "REVIEW" ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"
        }`}>
          {s.computedStatus}
        </span>
      </td>
    </tr>
  );
}