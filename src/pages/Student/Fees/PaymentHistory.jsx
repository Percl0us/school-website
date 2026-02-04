import { useState } from "react";
import ReceiptModal from "./modal/ReceiptModal";

export default function PaymentHistory({ payments, student, academic }) {
  const [open, setOpen] = useState(false);
  const [activePayment, setActivePayment] = useState(null);

  const confirmedPayments = payments.filter(
    (p) => p.status === "CONFIRMED"
  );

  if (confirmedPayments.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* =====================
          Header (clickable)
      ===================== */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition"
      >
        <div>
          <h2 className="font-semibold">Payment History</h2>
          <p className="text-xs text-gray-500">
            {confirmedPayments.length} payment
            {confirmedPayments.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Chevron */}
        <span
          className={`transform transition-transform duration-300 ${
            open ? "rotate-180 text-gray-700" : "text-gray-400"
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* =====================
          Sliding Content
      ===================== */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t px-4 py-3 space-y-3">
          {confirmedPayments.map((payment) => (
            <div
              key={payment.id}
              className="border rounded-md p-3 text-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">
                    ₹{payment.amount}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(payment.createdAt).toLocaleDateString()} ·{" "}
                    {payment.mode}
                  </div>
                </div>

                <button
                  onClick={() => setActivePayment(payment)}
                  className="text-blue-600 text-xs hover:underline"
                >
                  View Receipt
                </button>
              </div>

              {payment.monthsCovered?.length > 0 && (
                <div className="mt-2 text-xs text-gray-600">
                  Months: {payment.monthsCovered.join(", ")}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* =====================
          Receipt Modal
      ===================== */}
      {activePayment && (
        <ReceiptModal
          payment={activePayment}
          student={student}
          academic={academic}
          onClose={() => setActivePayment(null)}
        />
      )}
    </div>
  );
}
