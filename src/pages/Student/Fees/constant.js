export const ACADEMIC_MONTHS = [
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

export const getCurrentAcademicIndex = () => {
  const m = new Date().getMonth() + 1;
  return m >= 4 ? m - 4 : m + 8;
};

export const getFeeStartIndex = (feeStartMonth) => {
  return feeStartMonth >= 4
    ? feeStartMonth - 4
    : feeStartMonth + 8;
};
