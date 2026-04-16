import api from "../lib/api.js";

// ==================== STUDENT ENDPOINTS (authenticated via token) ====================

// Get all results for the logged‑in student (no parameters needed)
export const getAllStudentResults = async () => {
  try {
    const response = await api.get("/student/results");
    return response.data;
  } catch (error) {
    console.error("Error fetching all results:", error);
    throw error;
  }
};

// Get results for a specific academic year (e.g., "2026-2027")
export const getStudentResultsByYear = async (academicYear) => {
  try {
    const response = await api.get(`/student/results/${academicYear}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching results by year:", error);
    throw error;
  }
};

// ==================== ADMIN ENDPOINTS (require admin token) ====================

// Create a result for any student (admin only)
export const createResult = async (admissionNo, academicYear, subjects) => {
  try {
    const response = await api.post("/admin/results", {
      admissionNo,
      academicYear,
      subjects,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating result:", error);
    throw error;
  }
};

// Update an existing result (admin only)
export const updateResult = async (admissionNo, academicYear, subjects) => {
  try {
    const response = await api.patch("/admin/results", 
      { subjects },
      { params: { admissionNo, academicYear } }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating result:", error);
    throw error;
  }
};

export const getAdminStudentResult = async (admissionNo, academicYear) => {
  try {
    const response = await api.get(`/admin/results/${admissionNo}/${academicYear}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin student result:", error);
    throw error;
  }
};

export const saveAdminStudentResult = async ({
  admissionNo,
  academicYear,
  subjects,
  resultExists,
}) => {
  try {
    const endpoint = `/admin/results/${admissionNo}/${academicYear}`;
    const payload = { subjects };

    if (resultExists) {
      const response = await api.patch(endpoint, payload);
      return response.data;
    }

    const response = await api.post("/admin/results", {
      admissionNo,
      academicYear,
      subjects,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving admin student result:", error);
    throw error;
  }
};
