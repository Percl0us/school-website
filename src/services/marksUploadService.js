import api from "../lib/api.js";

/**
 * Download Excel template for a class
 */
export const downloadMarksTemplate = async (className, academicYear) => {
  try {
    const response = await api.get(
      `/admin/results/template/${className}/${academicYear}`,
      { responseType: 'blob' }
    );
    
    // Create blob link to download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Marks_${className}_${academicYear}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();  // ✅ Fixed: use remove() instead of parentURL.removeChild
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error("Error downloading template:", error);
    throw error;
  }
};

/**
 * Upload and validate marks file
 * Expected backend: POST /admin/results/bulk-upload
 * Sends file, className, academicYear
 */
export const uploadMarksFile = async (file, className, academicYear) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('className', className);      // ✅ backend expects 'className'
    formData.append('academicYear', academicYear);

    const response = await api.post('/admin/results/bulk-upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading marks:", error);
    throw error;
  }
};

/**
 * Confirm and import validated marks
 * Backend expects: POST /admin/results/confirm
 * Body: { data: validRows, academicYear, className }
 */
export const confirmMarksImport = async (validRows, academicYear, className) => {
  try {
    const response = await api.post('/admin/results/confirm', {
      data: validRows,
      academicYear,
      className,
    });
    return response.data;
  } catch (error) {
    console.error("Error confirming import:", error);
    throw error;
  }
};

// Optional: get schema – you can remove if not used, or implement later
export const getResultsSchema = async (className, academicYear) => {
  // Not yet implemented on backend – can be removed
  console.warn("getResultsSchema not implemented");
  return { subjects: [] };
};