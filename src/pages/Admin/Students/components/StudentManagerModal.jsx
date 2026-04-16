import { Pencil, Save, Trash2, X } from "lucide-react";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}

function SnapshotCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-2 text-lg font-semibold text-slate-900">Rs {value ?? 0}</div>
    </div>
  );
}

export default function StudentManagerModal({
  classes,
  deletingStudent,
  form,
  modalError,
  modalLoading,
  modalMessage,
  onClose,
  onDeleteStudent,
  onFormChange,
  onProfileImageChange,
  onSaveProfile,
  onSaveResult,
  onSubjectChange,
  profilePreview,
  resultData,
  savingProfile,
  savingResult,
  selectedStudent,
  academicYear,
}) {
  if (!selectedStudent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/50 p-4 md:p-8">
      <div className="max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] bg-slate-50 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Manage {selectedStudent.name}
            </h2>
            <p className="text-sm text-slate-500">
              Admission No {selectedStudent.admissionNo} | Session {academicYear}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        {modalLoading ? (
          <div className="px-6 py-16 text-center text-slate-500">
            Loading student manager...
          </div>
        ) : (
          <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr]">
            <form
              onSubmit={onSaveProfile}
              className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Pencil size={18} className="text-blue-600" />
                <div>
                  <h3 className="font-semibold text-slate-900">Student Profile</h3>
                  <p className="text-sm text-slate-500">
                    Update identity, guardians, class, and fee settings.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Profile Image
                  </label>
                  <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 md:flex-row md:items-center">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white">
                      {profilePreview ? (
                        <img
                          src={profilePreview}
                          alt={form.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-slate-400">No image</span>
                      )}
                    </div>
                    <input type="file" accept="image/*" onChange={onProfileImageChange} />
                  </div>
                </div>

                <Field label="Admission No">
                  <input
                    value={form.admissionNo}
                    disabled
                    className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500"
                  />
                </Field>

                <Field label="Full Name">
                  <input
                    name="name"
                    value={form.name}
                    onChange={onFormChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  />
                </Field>

                <Field label="Date of Birth">
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={onFormChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  />
                </Field>

                <Field label="Class">
                  <select
                    name="class"
                    value={form.class}
                    onChange={onFormChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  >
                    <option value="">Select class</option>
                    {classes.map((className) => (
                      <option key={className} value={className}>
                        {className}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Section">
                  <input
                    name="section"
                    value={form.section}
                    onChange={onFormChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm uppercase outline-none"
                  />
                </Field>

                <Field label="Father Name">
                  <input
                    name="fatherName"
                    value={form.fatherName}
                    onChange={onFormChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  />
                </Field>

                <Field label="Mother Name">
                  <input
                    name="motherName"
                    value={form.motherName}
                    onChange={onFormChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  />
                </Field>

                <Field label="Fee Start Month">
                  <select
                    name="feeStartMonth"
                    value={form.feeStartMonth}
                    onChange={onFormChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  >
                    {[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ].map((month, index) => (
                      <option key={month} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <label className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-slate-700">Transport service</span>
                    <input
                      type="checkbox"
                      name="transportOpted"
                      checked={form.transportOpted}
                      onChange={onFormChange}
                      className="h-4 w-4"
                    />
                  </label>
                  {form.transportOpted && (
                    <input
                      type="number"
                      name="transportFee"
                      value={form.transportFee}
                      onChange={onFormChange}
                      placeholder="Annual transport fee"
                      className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
                >
                  <Save size={16} />
                  {savingProfile ? "Saving..." : "Save Profile"}
                </button>
                <button
                  type="button"
                  onClick={onDeleteStudent}
                  disabled={deletingStudent}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white"
                >
                  <Trash2 size={16} />
                  {deletingStudent ? "Deleting..." : "Delete Student"}
                </button>
              </div>
            </form>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">Result Management</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Edit subject-wise marks for {academicYear}. Blank marks are treated as absent.
                </p>

                {!resultData || resultData.subjects.length === 0 ? (
                  <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    No subject structure was found for this student&apos;s class in the selected session.
                  </div>
                ) : (
                  <div className="mt-4 space-y-3">
                    {resultData.subjects.map((subject, index) => (
                      <div
                        key={`${subject.name}-${index}`}
                        className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <div className="text-sm font-semibold text-slate-900">
                          {subject.name}
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          <input
                            type="number"
                            value={subject.marksObtained ?? ""}
                            min="0"
                            max={subject.maxMarks || 100}
                            onChange={(event) =>
                              onSubjectChange(index, "marksObtained", event.target.value)
                            }
                            placeholder="Marks obtained"
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                          />
                          <input
                            value={subject.grade || ""}
                            onChange={(event) => onSubjectChange(index, "grade", event.target.value)}
                            placeholder="Grade"
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={onSaveResult}
                      disabled={savingResult}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
                    >
                      <Save size={16} />
                      {savingResult ? "Saving..." : "Save Result"}
                    </button>
                  </div>
                )}
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">Fee Snapshot</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <SnapshotCard label="Net Fee" value={selectedStudent.feeAccount?.totalFee ?? 0} />
                  <SnapshotCard label="Paid" value={selectedStudent.feeAccount?.totalPaid ?? 0} />
                  <SnapshotCard label="Balance" value={selectedStudent.feeAccount?.balance ?? 0} />
                </div>
              </div>

              {(modalError || modalMessage) && (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    modalError
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-green-200 bg-green-50 text-green-700"
                  }`}
                >
                  {modalError || modalMessage}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
