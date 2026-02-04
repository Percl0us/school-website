const ACADEMIC_MONTHS = [
  { key: "APR", index: 0 },
  { key: "MAY", index: 1 },
  { key: "JUN", index: 2 },
  { key: "JUL", index: 3 },
  { key: "AUG", index: 4 },
  { key: "SEP", index: 5 },
  { key: "OCT", index: 6 },
  { key: "NOV", index: 7 },
  { key: "DEC", index: 8 },
  { key: "JAN", index: 9 },
  { key: "FEB", index: 10 },
  { key: "MAR", index: 11 },
];

export function useFeeDerivedData({ academic, payments, feeAccount }) {
  /* =========================
     Academic month logic
  ========================= */
  const startIndex =
    academic.feeStartMonth >= 4
      ? academic.feeStartMonth - 4
      : academic.feeStartMonth + 8;

  const applicableMonths = 12 - startIndex;

  /* =========================
     Display monthly fees (FIX)
  ========================= */
  const monthlyTotal = Math.round(feeAccount.totalFee / applicableMonths);

  const monthlyTransport = academic.transportOpted
    ? Math.round(academic.transportFee / 12)
    : 0;

  const monthlyTuition = monthlyTotal - monthlyTransport;

  /* =========================
     Paid months
  ========================= */
  const paidMonths = new Set();

  payments
    .filter((p) => p.status === "CONFIRMED")
    .forEach((p) => {
      p.monthsCovered?.forEach((m) => paidMonths.add(m));
    });

  const isFullyPaid = feeAccount.balance === 0;

  /* =========================
     Earliest unpaid month
  ========================= */
  const unpaidApplicableMonths = ACADEMIC_MONTHS.slice(startIndex).filter(
    (m) => !isFullyPaid && !paidMonths.has(m.key),
  );

  const earliestUnpaidMonth =
    unpaidApplicableMonths.length > 0 ? unpaidApplicableMonths[0].key : null;
console.log(earliestUnpaidMonth);
  /* =========================
     Current academic index
  ========================= */
  const getCurrentAcademicIndex = () => {
    const m = new Date().getMonth() + 1;
    return m >= 4 ? m - 4 : m + 8;
  };

  const currentAcademicIndex = getCurrentAcademicIndex();

  /* =========================
     Month status
  ========================= */
  const getMonthStatus = (month) => {
    if (month.index < startIndex) return "NA";
    if (isFullyPaid || paidMonths.has(month.key)) return "PAID";
    if (month.index < currentAcademicIndex) return "OVERDUE";
    if (month.index === currentAcademicIndex) return "CURRENT";
    return "UPCOMING";
  };
  const startMonthKey = ACADEMIC_MONTHS[startIndex].key;
  const endMonthKey = "MAR";

  const applicableMonthsLabel = `${startMonthKey} – ${endMonthKey}`;

  return {
    monthlyTuition,
    monthlyTransport,
    monthlyTotal,
    earliestUnpaidMonth,
    getMonthStatus,
    applicableMonths,
    applicableMonthsLabel,
  };
}
