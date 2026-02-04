import { useStudent } from "../../context/StudentContext";
import { useState } from "react";
import { useFeeDerivedData } from "./fees/useFeeDerivedData";
import FeeSummary from "./fees/FeeSummary";
import MonthGrid from "./fees/MonthGrid";
import PaymentActions from "./fees/PaymentActions";
import Spinner from "../../components/ui/Spinner";
import PaymentHistory from "./fees/PaymentHistory";

export default function StudentFees() {
  const { studentSession, refreshStudentSession } = useStudent();

  if (!studentSession) {
    return <div className="p-6">Loading...</div>;
  }

  const { academic, payments, feeAccount, student } = studentSession;
console.log(feeAccount)
  // ✅ hooks belong here
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const derived = useFeeDerivedData({
    academic,
    payments,
    feeAccount,
  });

  return (
    <div className="space-y-6">
      {refreshing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl px-8 py-6 shadow-lg">
            <Spinner label="Updating fee status…" />
          </div>
        </div>
      )}
 
      <FeeSummary
        monthlyTuition={derived.monthlyTuition}
        monthlyTransport={derived.monthlyTransport}
        monthlyTotal={derived.monthlyTotal}
        balance={feeAccount.balance}
        applicableMonths={derived.applicableMonths}
        applicableMonthsLabel={derived.applicableMonthsLabel}
      />
      <PaymentHistory
        payments={payments}
        student={student}
        academic={academic}
      />

      <MonthGrid
        selectedMonths={selectedMonths}
        setSelectedMonths={setSelectedMonths}
        earliestUnpaidMonth={derived.earliestUnpaidMonth}
        getMonthStatus={derived.getMonthStatus}
        setWarning={setWarning}
      />

      {warning && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-2 rounded">
          {warning}
        </div>
      )}

      {feeAccount.balance > 0 && (
        <PaymentActions
          student={student}
          academic={academic}
          selectedMonths={selectedMonths}
          setSelectedMonths={setSelectedMonths}
          refreshStudentSession={refreshStudentSession}
          setRefreshing={setRefreshing}
          balance={feeAccount.balance}
          paying={paying}
          setPaying={setPaying}
          error={error}
          setError={setError}
          setWarning={setWarning}
          monthlyTotal={derived.monthlyTotal} // ✅ ADD THIS
        />
      )}
    </div>
  );
}
