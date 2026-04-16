import { useEffect } from "react";
import { createPortal } from "react-dom";
import { API_BASE_URL } from "../../../../lib/api";

export default function ReceiptModalPro({ payment, student, academic, onClose }) {
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

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);

  const monthsCovered =
    Array.isArray(payment.monthsCovered) && payment.monthsCovered.length > 0
      ? payment.monthsCovered.join(", ")
      : "Full outstanding dues";

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white shadow-2xl">
        <div className="bg-slate-900 px-6 py-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                Tagore Public School
              </p>
              <h2 className="mt-1 text-xl font-semibold">Fee Receipt Preview</h2>
              <p className="mt-1 text-sm text-slate-300">
                Receipt No. {payment.receiptNumber || "Pending"}
              </p>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-3 text-right">
              <p className="text-xs uppercase tracking-wide text-slate-300">Amount Paid</p>
              <p className="mt-1 text-lg font-semibold">{formatCurrency(payment.amount)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">Student Details</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Student</span>
                  <span className="text-right font-medium text-slate-900">{student.name}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Admission No</span>
                  <span className="font-medium text-slate-900">{student.admissionNo}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Father Name</span>
                  <span className="text-right font-medium text-slate-900">
                    {student.fatherName || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Class</span>
                  <span className="font-medium text-slate-900">
                    {academic.class}
                    {academic.section ? ` - ${academic.section}` : ""}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Academic Year</span>
                  <span className="font-medium text-slate-900">{academic.academicYear}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">Payment Details</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Payment Date</span>
                  <span className="text-right font-medium text-slate-900">
                    {new Date(payment.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Payment Mode</span>
                  <span className="font-medium text-slate-900">{payment.mode}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Status</span>
                  <span className="font-medium text-emerald-700">{payment.status}</span>
                </div>
                {payment.utrNumber && (
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">UTR / Reference</span>
                    <span className="text-right font-medium text-slate-900">
                      {payment.utrNumber}
                    </span>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Receipt Number</span>
                  <span className="text-right font-medium text-slate-900">
                    {payment.receiptNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200">
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
              <h3 className="text-sm font-semibold text-slate-900">Fee Breakdown</h3>
            </div>
            <div className="space-y-4 p-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Fee Head</span>
                <span className="text-right font-medium text-slate-900">
                  Tuition and applicable school fee payment
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Months Covered</span>
                <span className="text-right font-medium text-slate-900">{monthsCovered}</span>
              </div>
              <div className="flex justify-between gap-4 border-t border-dashed border-slate-200 pt-4">
                <span className="text-slate-500">Paid This Time</span>
                <span className="text-base font-semibold text-slate-900">
                  {formatCurrency(payment.amount)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-900">
            The downloaded PDF includes the full professional receipt with detailed fee summary,
            payment reference details, and outstanding balance information.
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            onClick={handleDownload}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Download Receipt
          </button>

          <button
            onClick={onClose}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
}
