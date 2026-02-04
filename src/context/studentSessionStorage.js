const KEY = "student_login_context";

export const saveStudentLogin = ({ admissionNo, dob, academicYear }) => {
  localStorage.setItem(
    KEY,
    JSON.stringify({ admissionNo, dob, academicYear })
  );
};

export const getSavedStudentLogin = () => {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const clearStudentLogin = () => {
  localStorage.removeItem(KEY);
};
