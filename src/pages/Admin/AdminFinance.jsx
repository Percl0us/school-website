import { useEffect, useState } from "react";
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

  const fetchData = async () => {
    const res = await api.get(
      `/admin/students/${admissionNo}/${academicYear}/finance`
    );
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

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