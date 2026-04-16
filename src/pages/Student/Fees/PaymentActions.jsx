import { useState } from "react";
import api from "../../../lib/api";
import QRPaymentModal from "./QRPaymentModal";

export default function PaymentActions({
  student,
  academic,
  selectedMonths,
  setSelectedMonths,
  refreshStudentSession,
  setRefreshing,
  balance,
  paying,
  setPaying,
  error,
  setError,
  setWarning,
}) {
  const [quote, setQuote] = useState(null);

  const handleQuote = async (paymentType) => {
    try {
      setPaying(true);
      setError("");

      const res = await api.post("/payments/quote", {
        admissionNo: student.admissionNo,
        academicYear: academic.academicYear,
        paymentType,
        months:
          paymentType === "MONTHS" ? selectedMonths : [],
      });

      setQuote({
        ...res.data,
        paymentType,
        months: Array.isArray(res.data.monthsCovered)
          ? res.data.monthsCovered
          : [],
      });
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Unable to initiate payment"
      );
    } finally {
      setPaying(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 space-y-3">
        <h2 className="font-semibold">
          Secure UPI Payment
        </h2>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {/* Pay Selected Months */}
        <button
          disabled={
            selectedMonths.length === 0 || paying
          }
          onClick={() => handleQuote("MONTHS")}
          className="w-full bg-blue-700 text-white py-2 rounded disabled:opacity-50"
        >
          Pay Selected Months
        </button>

        {/* Pay Full Outstanding */}
        <button
          disabled={paying}
          onClick={() => handleQuote("FULL")}
          className="w-full border border-blue-700 text-blue-700 py-2 rounded"
        >
          Pay Full Outstanding ₹{balance}
        </button>
      </div>

      {quote && (
        <QRPaymentModal
          quote={quote}
          student={student}
          academic={academic}
          onClose={() => setQuote(null)}
          onSubmitted={async () => {
            setRefreshing(true);
            setQuote(null);
            setSelectedMonths([]);
            setWarning("");
            await refreshStudentSession();
            setRefreshing(false);
          }}
        />
      )}
    </>
  );
}
