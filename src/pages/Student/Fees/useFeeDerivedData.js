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

  const startIndex =
    academic.feeStartMonth >= 4
      ? academic.feeStartMonth - 4
      : academic.feeStartMonth + 8;

  const applicableMonths = 12 - startIndex;

  const monthlyTotal =
    applicableMonths > 0
      ? Math.round(feeAccount.totalFee / applicableMonths)
      : 0;

  const monthlyTransport = academic.transportOpted
    ? Math.round((academic.transportFee || 0) / 12)
    : 0;

  const monthlyTuition = monthlyTotal - monthlyTransport;

  /* =========================
     Build Payment Sets
  ========================= */

  const confirmedPayments = payments.filter(
    (p) => p.status === "CONFIRMED"
  );

  const submittedPayments = payments.filter(
    (p) => p.status === "PAYMENT_SUBMITTED"
  );

  const paidMonthsSet = new Set();
  confirmedPayments.forEach((p) => {
    p.monthsCovered?.forEach((m) => paidMonthsSet.add(m));
  });

  const submittedMonthsSet = new Set();
  submittedPayments.forEach((p) => {
    p.monthsCovered?.forEach((m) => submittedMonthsSet.add(m));
  });

  const isFullyPaid = feeAccount.balance === 0;

  /* =========================
     Earliest Unpaid Month
  ========================= */

  const unpaidApplicableMonths = ACADEMIC_MONTHS
    .slice(startIndex)
    .filter(
      (m) =>
        !isFullyPaid &&
        !paidMonthsSet.has(m.key)
    );

  const earliestUnpaidMonth =
    unpaidApplicableMonths.length > 0
      ? unpaidApplicableMonths[0].key
      : null;

  /* =========================
     Current Academic Index
  ========================= */

  const getCurrentAcademicIndex = () => {
    const m = new Date().getMonth() + 1;
    return m >= 4 ? m - 4 : m + 8;
  };

  const currentAcademicIndex = getCurrentAcademicIndex();

  /* =========================
     Month Status Logic
  ========================= */

  const getMonthStatus = (month) => {
    const monthObj = ACADEMIC_MONTHS.find(
      (m) => m.key === month
    );

    if (!monthObj) return "NA";

    if (monthObj.index < startIndex) {
      return "NA";
    }

    if (paidMonthsSet.has(month)) {
      return "PAID";
    }

    if (submittedMonthsSet.has(month)) {
      return "UNDER_REVIEW";
    }

    if (monthObj.index < currentAcademicIndex) {
      return "OVERDUE";
    }

    if (monthObj.index === currentAcademicIndex) {
      return "CURRENT";
    }

    return "UPCOMING";
  };

  const startMonthKey = ACADEMIC_MONTHS[startIndex].key;
  const applicableMonthsLabel = `${startMonthKey} – MAR`;

  return {
    monthlyTuition,
    monthlyTransport,
    monthlyTotal,
    earliestUnpaidMonth,
    getMonthStatus,
    applicableMonths,
    applicableMonthsLabel,
    confirmedPayments,
    submittedPayments,
  };
}