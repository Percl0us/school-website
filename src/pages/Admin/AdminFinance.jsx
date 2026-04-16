import { useCallback, useEffect, useState } from "react";
import api from "../../lib/api";
import FinanceSummary from "./FinanceSummary";
import PaymentTable from "./PaymentTable";
import DiscountSection from "./DiscountSection";

export default function AdminFinance({
  admissionNo,
  academicYear,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    if (!admissionNo || !academicYear) return;

    try {
      setLoading(true);
      setError("");
      const res = await api.get(
        `/admin/students/${admissionNo}/${academicYear}/finance`
      );
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load finance data.");
    } finally {
      setLoading(false);
    }
  }, [admissionNo, academicYear]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!data) return <div className="p-6">No finance data found.</div>;

  return (
    <div className="p-6 space-y-6">
      <FinanceSummary
        feeAccount={data.feeAccount}
      />

      <DiscountSection
        discounts={data.discounts}
        admissionNo={admissionNo}
        academicYear={academicYear}
        refresh={fetchData}
      />

      <PaymentTable
        payments={data.payments}
        refresh={fetchData}
      />
    </div>
  );
}
