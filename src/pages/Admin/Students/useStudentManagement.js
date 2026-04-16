import { useCallback, useEffect, useMemo, useState } from "react";
import { deleteStudent, getClassesBySession, getStudentDetail, getStudentsBySession, updateStudent } from "../../../services/studentService";
import { getAdminStudentResult, saveAdminStudentResult } from "../../../services/resultsService";
import { calculateStatus, defaultForm } from "./studentManagement.constants";

export default function useStudentManagement(academicYear) {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [resultData, setResultData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingResult, setSavingResult] = useState(false);
  const [deletingStudent, setDeletingStudent] = useState(false);
  const [modalError, setModalError] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const refreshStudents = useCallback(async () => {
    if (!academicYear) return;

    setLoading(true);
    setPageError("");

    try {
      const [studentList, classList] = await Promise.all([
        getStudentsBySession(academicYear),
        getClassesBySession(academicYear),
      ]);
      setStudents(studentList);
      setClasses(classList);
    } catch (err) {
      setPageError(err.response?.data?.error || "Failed to load students.");
    } finally {
      setLoading(false);
    }
  }, [academicYear]);

  useEffect(() => {
    refreshStudents();
  }, [refreshStudents]);

  const filterOptions = useMemo(() => {
    const unique = new Set([...(classes || []), ...students.map((student) => student.class)]);
    return ["ALL", ...Array.from(unique)];
  }, [classes, students]);

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();

    return students
      .filter((student) => {
        if (classFilter !== "ALL" && student.class !== classFilter) {
          return false;
        }

        if (!term) {
          return true;
        }

        return [student.name, student.admissionNo, student.fatherName, student.motherName]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(term));
      })
      .map((student) => ({
        ...student,
        status: calculateStatus(student),
      }));
  }, [classFilter, search, students]);

  const openStudentManager = useCallback(async (student) => {
    setSelectedStudent(student);
    setModalLoading(true);
    setModalError("");
    setModalMessage("");
    setProfileImage(null);

    try {
      const [detail, result] = await Promise.all([
        getStudentDetail(student.admissionNo, academicYear),
        getAdminStudentResult(student.admissionNo, academicYear),
      ]);

      setForm({
        admissionNo: detail.admissionNo,
        name: detail.name || "",
        fatherName: detail.fatherName || "",
        motherName: detail.motherName || "",
        dob: detail.dob ? new Date(detail.dob).toISOString().slice(0, 10) : "",
        class: detail.class || "",
        section: detail.section || "",
        feeStartMonth: detail.feeStartMonth || 4,
        transportOpted: Boolean(detail.transportOpted),
        transportFee: detail.transportFee || "",
      });
      setProfilePreview(detail.profileImageUrl || "");
      setResultData({
        ...result,
        subjects: Array.isArray(result.subjects) ? result.subjects : [],
      });
      setSelectedStudent({
        ...student,
        feeAccount: detail.feeAccount || null,
        profileImageUrl: detail.profileImageUrl || student.profileImageUrl || "",
      });
    } catch (err) {
      setModalError(err.response?.data?.error || "Failed to load student details.");
    } finally {
      setModalLoading(false);
    }
  }, [academicYear]);

  const closeModal = useCallback(() => {
    setSelectedStudent(null);
    setForm(defaultForm);
    setResultData(null);
    setProfileImage(null);
    setProfilePreview("");
    setModalError("");
    setModalMessage("");
    setModalLoading(false);
  }, []);

  const handleFormChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "transportOpted" && !checked ? { transportFee: "" } : {}),
    }));
  }, []);

  const handleProfileImageChange = useCallback((event) => {
    const file = event.target.files?.[0] || null;
    setProfileImage(file);

    if (!file) {
      setProfilePreview(selectedStudent?.profileImageUrl || "");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setProfilePreview(reader.result);
    reader.readAsDataURL(file);
  }, [selectedStudent]);

  const handleSaveProfile = useCallback(async (event) => {
    event.preventDefault();
    setModalError("");
    setModalMessage("");

    if (!form.name.trim() || !form.dob || !form.class) {
      setModalError("Name, date of birth, and class are required.");
      return;
    }

    if (form.transportOpted && !form.transportFee) {
      setModalError("Transport fee is required when transport is enabled.");
      return;
    }

    setSavingProfile(true);

    try {
      const updated = await updateStudent(selectedStudent.admissionNo, {
        academicYear,
        name: form.name.trim(),
        fatherName: form.fatherName.trim(),
        motherName: form.motherName.trim(),
        dob: form.dob,
        class: form.class,
        section: form.section.trim().toUpperCase(),
        feeStartMonth: form.feeStartMonth,
        transportOpted: form.transportOpted,
        transportFee: form.transportOpted ? form.transportFee : "",
        profileImage,
      });

      setStudents((current) =>
        current.map((student) =>
          student.admissionNo === updated.admissionNo
            ? {
                ...student,
                name: updated.name,
                fatherName: updated.fatherName,
                motherName: updated.motherName,
                dob: updated.dob,
                class: updated.class,
                section: updated.section,
                feeStartMonth: updated.feeStartMonth,
                transportOpted: updated.transportOpted,
                transportFee: updated.transportFee,
                profileImageUrl: updated.profileImageUrl,
                totalFee: updated.feeAccount?.totalFee ?? student.totalFee,
                totalPaid: updated.feeAccount?.totalPaid ?? student.totalPaid,
                balance: updated.feeAccount?.balance ?? student.balance,
              }
            : student,
        ),
      );

      setSelectedStudent((current) =>
        current
          ? {
              ...current,
              ...updated,
              feeAccount: updated.feeAccount || current.feeAccount,
            }
          : current,
      );
      setProfileImage(null);
      setProfilePreview(updated.profileImageUrl || profilePreview);
      setModalMessage("Student profile updated successfully.");
    } catch (err) {
      setModalError(err.response?.data?.error || "Failed to update student.");
    } finally {
      setSavingProfile(false);
    }
  }, [academicYear, form, profileImage, profilePreview, selectedStudent]);

  const handleSubjectChange = useCallback((index, field, value) => {
    setResultData((current) => ({
      ...current,
      subjects: current.subjects.map((subject, subjectIndex) =>
        subjectIndex === index
          ? {
              ...subject,
              [field]: value,
            }
          : subject,
      ),
    }));
  }, []);

  const handleSaveResult = useCallback(async () => {
    setModalError("");
    setModalMessage("");

    if (!resultData || !Array.isArray(resultData.subjects) || resultData.subjects.length === 0) {
      setModalError("No subjects are available for this student. Add subjects in the fee structure first.");
      return;
    }

    const subjects = resultData.subjects.map((subject) => ({
      name: subject.name,
      maxMarks: Number(subject.maxMarks || 100),
      marksObtained:
        subject.marksObtained === "" || subject.marksObtained === null
          ? null
          : Number(subject.marksObtained),
      grade: subject.grade,
    }));

    const invalidMarks = subjects.find(
      (subject) =>
        subject.marksObtained !== null &&
        (!Number.isFinite(subject.marksObtained) ||
          subject.marksObtained < 0 ||
          subject.marksObtained > subject.maxMarks),
    );

    if (invalidMarks) {
      setModalError(`Marks for ${invalidMarks.name} must stay between 0 and ${invalidMarks.maxMarks}.`);
      return;
    }

    setSavingResult(true);

    try {
      await saveAdminStudentResult({
        admissionNo: selectedStudent.admissionNo,
        academicYear,
        subjects,
        resultExists: resultData.resultExists,
      });

      setResultData((current) => ({
        ...current,
        resultExists: true,
        subjects,
      }));
      setModalMessage("Student result updated successfully.");
    } catch (err) {
      setModalError(err.response?.data?.error || "Failed to update result.");
    } finally {
      setSavingResult(false);
    }
  }, [academicYear, resultData, selectedStudent]);

  const handleDeleteStudent = useCallback(async () => {
    if (!selectedStudent) return;

    const confirmed = window.confirm(
      `Delete ${selectedStudent.name} (${selectedStudent.admissionNo}) and all related academic, fee, payment, discount, and result records?`,
    );

    if (!confirmed) return;

    setDeletingStudent(true);
    setModalError("");
    setModalMessage("");

    try {
      await deleteStudent(selectedStudent.admissionNo);
      setStudents((current) =>
        current.filter((student) => student.admissionNo !== selectedStudent.admissionNo),
      );
      closeModal();
    } catch (err) {
      setModalError(err.response?.data?.error || "Failed to delete student.");
    } finally {
      setDeletingStudent(false);
    }
  }, [closeModal, selectedStudent]);

  return {
    classFilter,
    closeModal,
    filterOptions,
    filteredStudents,
    form,
    handleDeleteStudent,
    handleFormChange,
    handleProfileImageChange,
    handleSaveProfile,
    handleSaveResult,
    handleSubjectChange,
    loading,
    modalError,
    modalLoading,
    modalMessage,
    openStudentManager,
    pageError,
    profilePreview,
    refreshStudents,
    resultData,
    savingProfile,
    savingResult,
    search,
    selectedStudent,
    setClassFilter,
    setSearch,
    deletingStudent,
    classes,
  };
}
