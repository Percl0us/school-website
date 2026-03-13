import { useState } from "react";
import api from "../../../lib/api";
import { Upload, X, CheckCircle2, AlertCircle } from "lucide-react";

export default function QRPaymentModal({ quote, student, academic, onClose, onSubmitted }) {
  const [utrNumber, setUtrNumber] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!file || !utrNumber) {
      setError("UTR number and screenshot are required.");
      return;
    }
    try {
      setSubmitting(true);
      setError("");
      const formData = new FormData();
      formData.append("admissionNo", student.admissionNo);
      formData.append("academicYear", academic.academicYear);
      formData.append("paymentType", quote.paymentType);
      formData.append("months", JSON.stringify(quote.months));
      formData.append("utrNumber", utrNumber);
      formData.append("screenshot", file);

      await api.post("/payments/submit-proof", formData);
      onSubmitted();
    } catch (err) {
      setError(err.response?.data?.error || "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // 1. Added 'overflow-y-auto' and 'py-8' to the overlay to allow scrolling the whole modal on tiny screens
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-start md:items-center justify-center z-50 p-4 overflow-y-auto">
      
      {/* 2. Added 'max-h-full' or 'max-h-[90vh]' to the card */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md my-auto flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Fixed Header */}
        <div className="bg-slate-50 px-6 py-4 border-b flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Payment Proof</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Secure Verification</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* 3. SCROLLABLE CONTENT AREA */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-5" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          
          {/* Amount Hero - Reduced size slightly */}
          <div className="text-center">
            <span className="text-xs text-slate-500 font-medium uppercase">Total Amount</span>
            <div className="text-3xl font-black text-slate-900">₹{quote.amount.toLocaleString()}</div>
          </div>

          {/* QR Code Section - Made QR size responsive */}
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center space-y-2">
            <div className="bg-white p-2 rounded-lg shadow-sm border">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=${quote.upiId}&pn=School&am=${quote.amount}&cu=INR`}
                alt="UPI QR"
                className="w-28 h-28 md:w-36 md:h-36" // Smaller on mobile
              />
            </div>
            <p className="text-[10px] text-slate-400 text-center leading-tight">
              Scan with GPay, PhonePe, or Paytm
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 ml-1">UTR / Transaction ID</label>
              <input
                type="text"
                placeholder="Enter 12-digit UTR"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 ml-1">Payment Screenshot</label>
              <label className="relative flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <div className="flex flex-col items-center justify-center">
                  {file ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle2 size={16} />
                      <span className="text-xs font-medium">{file.name.substring(0, 15)}...</span>
                    </div>
                  ) : (
                    <>
                      <Upload size={18} className="text-slate-400 mb-1" />
                      <p className="text-[10px] text-slate-500">Tap to Upload</p>
                    </>
                  )}
                </div>
                <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
              </label>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100">
              <AlertCircle size={14} />
              <p className="text-[11px] font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Fixed Footer Actions */}
        <div className="p-4 bg-slate-50 border-t flex gap-3 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-[2] bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {submitting ? "Submitting..." : "Verify Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}