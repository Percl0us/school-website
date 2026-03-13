import { useState } from "react";

export default function DiscountModal({ student, isApplying, onClose, onUpdate }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    const val = Number(amount);
    if (!val || val <= 0) return alert("Enter valid amount");
    if (val > student.balance) return alert("Exceeds balance");
    onUpdate(val);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-2xl space-y-4">
        <h3 className="font-bold text-xl">Manage Discount</h3>
        <div className="bg-gray-50 p-3 rounded text-sm space-y-1 border">
          <p><strong>Student:</strong> {student.name}</p>
          <p><strong>Balance:</strong> ₹{student.balance}</p>
        </div>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="New discount amount"
        />
        <div className="flex justify-end gap-3 pt-2">
          <button onClick={onClose} className="px-4 py-2 text-gray-600">Cancel</button>
          {student.activeDiscount > 0 && (
            <button 
              disabled={isApplying} 
              onClick={() => onUpdate(0, true)}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg"
            >
              Remove
            </button>
          )}
          <button 
            disabled={isApplying} 
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}