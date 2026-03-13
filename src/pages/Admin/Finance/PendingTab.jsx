import { useEffect, useState } from "react";
import api from "../../../lib/api";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  FileText, 
  Clock, 
  AlertCircle,
  ExternalLink,
  User
} from "lucide-react";

export default function PendingTab() {
  const { academicYear } = useAdminAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await api.get(`/admin/finance/pending?academicYear=${academicYear}`);
        setPayments(res.data);
      } catch (err) {
        console.error("Fetch pending payments failed:", err);
      } finally {
        setLoading(false);
      }
    };
    if (academicYear) fetchPending();
  }, [academicYear]);

  const handleAction = async (paymentId, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this payment?`)) return;
    
    try {
      setProcessing(true);
      await api.post(`/admin/payments/${paymentId}/${action}`);
      setPayments((prev) => prev.filter((p) => p.paymentId !== paymentId));
      setSelectedPayment(null);
    } catch (err) {
      alert(err.response?.data?.error || `Failed to ${action} payment`);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-medium">Loading pending verifications...</p>
    </div>
  );

  if (payments.length === 0) return (
    <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-16 text-center">
      <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="text-slate-300" size={32} />
      </div>
      <h3 className="text-slate-800 font-bold text-lg">All caught up!</h3>
      <p className="text-slate-500">There are no pending payments requiring verification.</p>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Summary Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
            <Clock size={20} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Pending Approvals</h2>
            <p className="text-xs text-slate-500">{payments.length} transactions waiting</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold text-slate-400 w-12 text-center">#</th>
              <th className="p-4 font-semibold text-slate-600">Student & Parents</th>
              <th className="p-4 font-semibold text-slate-600">Amount</th>
              <th className="p-4 font-semibold text-slate-600">UTR / Reference</th>
              <th className="p-4 font-semibold text-slate-600">Months</th>
              <th className="p-4 font-semibold text-slate-600 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map((p, index) => (
              <tr key={p.paymentId} className="hover:bg-slate-50/50 transition-colors group">
                <td className="p-4 text-center text-slate-400 font-medium">{index + 1}</td>
                <td className="p-4">
                  <div className="font-bold text-slate-900">{p.studentName}</div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    F: <span className="text-slate-700">{p.fatherName || "—"}</span> • M: <span className="text-slate-700">{p.motherName || "—"}</span>
                  </div>
                  <div className="text-[10px] text-blue-500 font-mono uppercase mt-1">
                    {p.admissionNo} • Class {p.class}
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-bold text-slate-900 text-base">₹{p.amount.toLocaleString()}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-xs border border-slate-200">
                      {p.utrNumber}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {p.monthsCovered.map(m => (
                      <span key={m} className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold uppercase">
                        {m}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedPayment(p)}
                    className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                  >
                    <Eye size={14} /> Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Auditor Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2">
                <FileText className="text-blue-600" size={20} />
                <h3 className="font-bold text-slate-800 text-lg tracking-tight">
                  Verifying Transaction: <span className="text-blue-600">{selectedPayment.utrNumber}</span>
                </h3>
              </div>
              <button onClick={() => setSelectedPayment(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <XCircle size={24} className="text-slate-400" />
              </button>
            </div>

            {/* Modal Body: Split Layout */}
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
              
              {/* Left Side: Details */}
              <div className="w-full lg:w-1/3 p-6 bg-slate-50/50 border-r overflow-y-auto space-y-6">
                <section className="space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Information</p>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Student Name</p>
                      <p className="font-black text-slate-900 text-lg leading-tight">{selectedPayment.studentName}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 pt-3 border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-slate-100 rounded text-slate-500"><User size={12}/></div>
                        <div>
                           <p className="text-[9px] text-slate-400 font-bold uppercase leading-none">Father's Name</p>
                           <p className="text-sm font-bold text-slate-700">{selectedPayment.fatherName || "—"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-slate-100 rounded text-slate-500"><User size={12}/></div>
                        <div>
                           <p className="text-[9px] text-slate-400 font-bold uppercase leading-none">Mother's Name</p>
                           <p className="text-sm font-bold text-slate-700">{selectedPayment.motherName || "—"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-50">
                      <div><p className="text-slate-400">ID</p><p className="font-bold">{selectedPayment.admissionNo}</p></div>
                      <div><p className="text-slate-400">Class</p><p className="font-bold">{selectedPayment.class}</p></div>
                    </div>
                  </div>
                </section>

                <section className="space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Data</p>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-end border-b pb-2">
                      <span className="text-xs text-slate-500">Amount to Confirm</span>
                      <span className="text-2xl font-black text-green-700">₹{selectedPayment.amount.toLocaleString()}</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">UTR Reference</p>
                      <p className="font-mono font-bold text-slate-800 bg-slate-50 p-2 rounded text-center border border-slate-100">
                        {selectedPayment.utrNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Months Applied</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedPayment.monthsCovered.map(m => (
                          <span key={m} className="bg-blue-100 text-blue-800 text-[10px] px-2 py-1 rounded font-black uppercase">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3">
                  <AlertCircle className="text-orange-500 shrink-0" size={18} />
                  <p className="text-[11px] text-orange-700 leading-normal">
                    Check the UTR and Amount against your bank statement before confirming. Confirming will update the student's ledger.
                  </p>
                </div>
              </div>

              {/* Right Side: Image View */}
              <div className="w-full lg:w-2/3 bg-slate-200 flex flex-col overflow-hidden">
                <div className="bg-slate-800 p-2 flex justify-between items-center px-4">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payment Proof (Receipt)</span>
                   <a 
                    href={selectedPayment.screenshotUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-white hover:text-blue-400 flex items-center gap-1 text-[10px] font-bold"
                   >
                     OPEN FULL <ExternalLink size={10} />
                   </a>
                </div>
                <div className="flex-1 overflow-auto flex items-center justify-center p-4">
                  <img
                    src={selectedPayment.screenshotUrl}
                    alt="Payment Proof"
                    className="max-w-full shadow-2xl rounded border-4 border-white"
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-white border-t flex justify-end gap-4 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)]">
              <button
                onClick={() => setSelectedPayment(null)}
                className="px-6 py-2.5 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              
              <div className="flex gap-3">
                <button
                  onClick={() => handleAction(selectedPayment.paymentId, "reject")}
                  disabled={processing}
                  className="flex items-center gap-2 px-6 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all border border-red-200 disabled:opacity-50"
                >
                  <XCircle size={18} /> Reject
                </button>
                
                <button
                  onClick={() => handleAction(selectedPayment.paymentId, "confirm")}
                  disabled={processing}
                  className="flex items-center gap-2 px-8 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-200 disabled:opacity-50"
                >
                  <CheckCircle size={18} /> Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}