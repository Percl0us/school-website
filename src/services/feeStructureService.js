import api from "../lib/api";

export const listFeeStructures = async (academicYear) => {
  const response = await api.get("/admin/fee-structures", {
    params: { academicYear },
  });
  return response.data.structures;
};

export const createFeeStructure = async (data) => {
  const response = await api.post("/admin/fee-structures", data);
  return response.data;
};

export const updateFeeStructure = async (id, data) => {
  const response = await api.patch(`/admin/fee-structures/${id}`, data);
  return response.data;
};

export const deleteFeeStructure = async (id) => {
  const response = await api.delete(`/admin/fee-structures/${id}`);
  return response.data;
};
