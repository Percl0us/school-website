import api, { API_BASE_URL } from "../../../lib/api";

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
  const openReceipt = (paymentId) => {
    const url =
      `${API_BASE_URL}/payments/${paymentId}/receipt` +
      `?admissionNo=${encodeURIComponent(student.admissionNo)}` +
      `&dob=${encodeURIComponent(student.dob)}`;

    window.open(url, "_blank");
  };

  const openRazorpay = (order) => {
    const options = {
      key: order.key,
      amount: order.amount,
      currency: "INR",
      name: "School Fees",
      order_id: order.razorpayOrderId,

      handler: async (response) => {
        try {
          setRefreshing(true);

          const verifyRes = await api.post("/payments/verify", {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });

          // ✅ OPEN RECEIPT IMMEDIATELY
          openReceipt(verifyRes.data.paymentId);

          // Refresh state in background
          await refreshStudentSession();

          setSelectedMonths([]);
          setWarning("");
        } catch (err) {
          setError("Payment successful, but receipt could not be loaded.");
        } finally {
          setRefreshing(false);
        }
      },
    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-3">
      <h2 className="font-semibold">Pay Fees</h2>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        disabled={selectedMonths.length === 0 || paying}
        onClick={async () => {
          try {
            setPaying(true);
            const res = await api.post("/payments/create-order", {
              admissionNo: student.admissionNo,
              academicYear: academic.academicYear,
              paymentType: "MONTHS",
              months: selectedMonths,
            });
            openRazorpay(res.data);
          } catch {
            setError("Unable to initiate payment");
          } finally {
            setPaying(false);
          }
        }}
        className="w-full bg-blue-700 text-white py-2 rounded disabled:opacity-50"
      >
        Pay Selected Months
      </button>

      <button
        disabled={paying}
        onClick={async () => {
          try {
            setPaying(true);
            const res = await api.post("/payments/create-order", {
              admissionNo: student.admissionNo,
              academicYear: academic.academicYear,
              paymentType: "FULL",
            });
            openRazorpay(res.data);
          } catch {
            setError("Unable to initiate payment");
          } finally {
            setPaying(false);
          }
        }}
        className="w-full border border-blue-700 text-blue-700 py-2 rounded"
      >
        Pay Full Outstanding ₹{balance}
      </button>
    </div>
  );
}
