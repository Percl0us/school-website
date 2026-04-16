import { useAdminAuth } from "../../../context/AdminAuthContext";
import StudentManagerModal from "./components/StudentManagerModal";
import StudentManagementTable from "./components/StudentManagementTable";
import StudentManagementToolbar from "./components/StudentManagementToolbar";
import useStudentManagement from "./useStudentManagement";

export default function StudentManagementPage() {
  const { academicYear } = useAdminAuth();
  const {
    classFilter,
    classes,
    closeModal,
    deletingStudent,
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
  } = useStudentManagement(academicYear);

  if (!academicYear) {
    return <div className="p-6">No session selected.</div>;
  }

  return (
    <div className="space-y-6">
      <StudentManagementToolbar
        academicYear={academicYear}
        classFilter={classFilter}
        filterOptions={filterOptions}
        loading={loading}
        onClassFilterChange={(event) => setClassFilter(event.target.value)}
        onRefresh={refreshStudents}
        onSearchChange={(event) => setSearch(event.target.value)}
        search={search}
      />

      {pageError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {pageError}
        </div>
      )}

      <StudentManagementTable
        filteredStudents={filteredStudents}
        loading={loading}
        onManageStudent={openStudentManager}
      />

      <StudentManagerModal
        academicYear={academicYear}
        classes={classes}
        deletingStudent={deletingStudent}
        form={form}
        modalError={modalError}
        modalLoading={modalLoading}
        modalMessage={modalMessage}
        onClose={closeModal}
        onDeleteStudent={handleDeleteStudent}
        onFormChange={handleFormChange}
        onProfileImageChange={handleProfileImageChange}
        onSaveProfile={handleSaveProfile}
        onSaveResult={handleSaveResult}
        onSubjectChange={handleSubjectChange}
        profilePreview={profilePreview}
        resultData={resultData}
        savingProfile={savingProfile}
        savingResult={savingResult}
        selectedStudent={selectedStudent}
      />
    </div>
  );
}
