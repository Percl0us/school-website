export const defaultForm = {
  admissionNo: "",
  name: "",
  fatherName: "",
  motherName: "",
  dob: "",
  class: "",
  section: "",
  feeStartMonth: 4,
  transportOpted: false,
  transportFee: "",
};

export function calculateStatus(student) {
  if (student.balance <= 0) return "UP_TO_DATE";
  if (student.totalPaid > 0) return "PARTIAL";
  return "UNPAID";
}
