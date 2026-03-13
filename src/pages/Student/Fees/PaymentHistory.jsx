import { useState } from "react";
import ReceiptModal from "./modal/ReceiptModal";

const getStatusStyle = (status) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-700";
    case "PAYMENT_SUBMITTED":
      return "bg-orange-100 text-orange-700";
    case "REJECTED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function PaymentHistory({
  payments,
  student,
  academic,
}) {
  const [open, setOpen] = useState(false);
  const [activePayment, setActivePayment] =
    useState(null);

  if (!payments || payments.length === 0)
    return null;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition"
      >
        <div>
          <h2 className="font-semibold">
            Payment History
          </h2>
          <p className="text-xs text-gray-500">
            {payments.length} payment
            {payments.length > 1 ? "s" : ""}
          </p>
        </div>

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

      {/* Sliding Content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open
            ? "max-h-[1000px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t px-4 py-3 space-y-3">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="border rounded-md p-3 text-sm"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="font-medium text-base">
                    ₹{payment.amount.toLocaleString()}
                  </div>

                  <div className="text-xs text-gray-500">
                    {new Date(
                      payment.createdAt
                    ).toLocaleDateString()}{" "}
                    · {payment.mode}
                  </div>

                  {payment.receiptNumber && (
                    <div className="text-xs text-gray-500">
                      Receipt: {payment.receiptNumber}
                    </div>
                  )}

                  {payment.monthsCovered?.length >
                    0 && (
                    <div className="text-xs text-gray-600">
                      Months:{" "}
                      {payment.monthsCovered.join(
                        ", "
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-semibold ${getStatusStyle(
                      payment.status
                    )}`}
                  >
                    {payment.status}
                  </span>

                  {payment.status ===
                    "CONFIRMED" && (
                    <button
                      onClick={() =>
                        setActivePayment(
                          payment
                        )
                      }
                      className="text-blue-600 text-xs hover:underline"
                    >
                      View Receipt
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Receipt Modal */}
      {activePayment && (
        <ReceiptModal
          payment={activePayment}
          student={student}
          academic={academic}
          onClose={() =>
            setActivePayment(null)
          }
        />
      )}
    </div>
  );
}