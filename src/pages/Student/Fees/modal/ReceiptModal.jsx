import { useEffect } from "react";
import { createPortal } from "react-dom";
import { API_BASE_URL } from "../../../../lib/api";

export default function ReceiptModal({ payment, student, academic, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleDownload = () => {
    const url =
      `${API_BASE_URL}/payments/${payment.id}/receipt` +
      `?admissionNo=${encodeURIComponent(student.admissionNo)}` +
      `&dob=${encodeURIComponent(student.dob)}`;

    window.open(url, "_blank");
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-base font-semibold text-gray-900">Fee Receipt</h2>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Receipt No</span>
            <span className="font-medium">{payment.receiptNumber}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Date</span>
            <span>{new Date(payment.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Payment Mode</span>
            <span>{payment.mode}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Amount Paid</span>
            <span className="font-medium">₹{payment.amount}</span>
          </div>

          {payment.monthsCovered?.length > 0 && (
            <div className="pt-2">
              <div className="text-gray-600 mb-1">Months Covered</div>
              <div className="text-xs text-gray-700">
                {payment.monthsCovered.join(", ")}
              </div>
            </div>
          )}

          <div className="pt-3 border-t text-xs text-gray-500">
            {student.name} · Admission No {student.admissionNo}
            <br />
            Academic Year {academic.academicYear}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleDownload}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Download Receipt
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
}
