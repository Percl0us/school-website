import { useState } from "react";
import api from "../../lib/api";

export default function DiscountSection({
  discounts,
  admissionNo,
  academicYear,
  refresh,
}) {
  const [amount, setAmount] = useState("");

  const applyDiscount = async () => {
    await api.post(
      "/admin/students/discount",
      {
        admissionNo,
        academicYear,
        amount: Number(amount),
      }
    );
    setAmount("");
    refresh();
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="font-semibold mb-4">
        Discounts
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
          placeholder="Discount Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="border rounded px-2 py-1"
        />

        <button
          onClick={applyDiscount}
          className="px-3 py-1 bg-blue-700 text-white rounded"
        >
          Apply
        </button>
      </div>

      {discounts.map((d) => (
        <div
          key={d.id}
          className="text-sm border-b py-1"
        >
          ₹{d.amount} —{" "}
          {d.active ? "Active" : "Inactive"} —{" "}
          {new Date(
            d.appliedAt
          ).toLocaleDateString()}
        </div>
      ))}
    </div>
  );
}