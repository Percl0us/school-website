import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../lib/api";

export default function AdminFinanceDashboard() {
  const [searchParams] = useSearchParams();
  const academicYear =
    searchParams.get("academicYear");

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchFinance = async () => {
      const res = await api.get(
        `/admin/finance?academicYear=${academicYear}`
      );
      setData(res.data);
    };

    if (academicYear) fetchFinance();
  }, [academicYear]);

  const kpis = useMemo(() => {
    if (!data) return null;

    const { accounts, payments, discounts } =
      data;

    const totalCollected = accounts.reduce(
      (sum, a) => sum + a.totalPaid,
      0
    );

    const totalOutstanding = accounts.reduce(
      (sum, a) => sum + a.balance,
      0
    );

    const studentsWithBalance = accounts.filter(
      (a) => a.balance > 0
    ).length;

    const studentsWithDiscount =
      discounts.filter((d) => d.active).length;

    const studentsWithPending =
      payments.filter(
        (p) => p.status === "PAYMENT_SUBMITTED"
      ).length;

    return {
      totalStudents: accounts.length,
      totalCollected,
      totalOutstanding,
      studentsWithBalance,
      studentsWithDiscount,
      studentsWithPending,
    };
  }, [data]);

  if (!academicYear)
    return <div className="p-6">No session selected.</div>;

  if (!data || !kpis)
    return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">
        Financial Dashboard — {academicYear}
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <Card
          title="Total Students"
          value={kpis.totalStudents}
        />
        <Card
          title="Total Collected"
          value={`₹${kpis.totalCollected}`}
          green
        />
        <Card
          title="Outstanding Balance"
          value={`₹${kpis.totalOutstanding}`}
          red
        />
        <Card
          title="Students With Balance"
          value={kpis.studentsWithBalance}
        />
        <Card
          title="Active Discounts"
          value={kpis.studentsWithDiscount}
        />
        <Card
          title="Pending Verifications"
          value={kpis.studentsWithPending}
        />
      </div>
    </div>
  );
}

function Card({ title, value, green, red }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">
        {title}
      </p>
      <p
        className={`text-lg font-semibold ${
          green ? "text-green-600" : ""
        } ${red ? "text-red-600" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}