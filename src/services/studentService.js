import api from "../lib/api.js";

export const getStudentsBySession = async (academicYear) => {
  const response = await api.get("/admin/students", {
    params: { academicYear },
  });
  return response.data;
};

export const getClassesBySession = async (academicYear) => {
  const response = await api.get("/admin/classes", {
    params: { academicYear },
  });
  return response.data;
};

export const getStudentDetail = async (admissionNo, academicYear) => {
  const response = await api.get(`/admin/students/${admissionNo}`, {
    params: { academicYear },
  });
  return response.data;
};

export const updateStudent = async (admissionNo, data) => {
  const payload = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      if (["section", "fatherName", "motherName", "transportFee"].includes(key)) {
        payload.append(key, "");
      }
      return;
    }

    payload.append(key, value instanceof File ? value : String(value));
  });

  const response = await api.patch(`/admin/students/${admissionNo}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteStudent = async (admissionNo) => {
  const response = await api.delete(`/admin/students/${admissionNo}`);
  return response.data;
};
