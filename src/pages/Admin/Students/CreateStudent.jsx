import { useEffect, useState } from "react";
import api from "../../../lib/api";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import {
  UserPlus,
  User,
  Calendar,
  School,
  Truck,
  CheckCircle2,
  AlertCircle,
  Hash,
  Users,
} from "lucide-react";

export default function CreateStudent() {
  const { academicYear } = useAdminAuth();
  const [csvFile, setCsvFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const handleCSVUpload = async () => {
    if (!csvFile) {
      setError("Please select a CSV file.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setMessage("");
      setUploadResult(null);

      const formData = new FormData();
      formData.append("file", csvFile);

      const res = await api.post("/admin/students/bulk-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadResult(res.data);
      setMessage("Bulk upload completed.");
      setCsvFile(null);
    } catch (err) {
      setError(err.response?.data?.error || "Bulk upload failed.");
    } finally {
      setUploading(false);
    }
  };
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    admissionNo: "",
    name: "",
    fatherName: "", // Added
    motherName: "", // Added
    dob: "",
    class: "",
    section: "",
    feeStartMonth: 4,
    transportOpted: false,
    transportFee: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.get(
          `/admin/classes?academicYear=${academicYear}`,
        );
        setClasses(res.data);
      } catch (err) {
        console.error("Failed to load classes");
      }
    };
    if (academicYear) fetchClasses();
  }, [academicYear]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await api.post("/admin/students", {
        ...form,
        academicYear,
        transportFee: form.transportOpted
          ? Number(form.transportFee)
          : undefined,
      });

      setMessage("Student record created successfully!");
      // Reset form
      setForm({
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
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create student.");
    } finally {
      setLoading(false);
    }
  };

  if (!academicYear)
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300">
        <AlertCircle className="mx-auto text-slate-400 mb-2" size={32} />
        <p className="text-slate-500 font-medium">
          Please select an academic session from the dashboard first.
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 text-blue-600 mb-2">
          <UserPlus size={24} />
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">
            Enrollment Portal
          </span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          New Student Entry
        </h1>
        <p className="text-slate-500 font-medium italic">
          Academic Session: {academicYear}
        </p>
      </div>
      {/* ================= BULK CSV UPLOAD ================= */}
      <div className="mb-10 bg-white p-6 rounded-2xl shadow-lg border border-slate-100 space-y-4">
        <div className="flex items-center gap-3 text-blue-600">
          <Users size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">
            Bulk Enrollment
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setCsvFile(e.target.files[0])}
            className="text-sm"
          />

          <button
            type="button"
            onClick={handleCSVUpload}
            disabled={uploading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-md disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload CSV"}
          </button>
        </div>

        {uploadResult && (
          <div className="mt-4 text-sm space-y-2">
            <div className="text-green-600 font-semibold">
              ✅ Success: {uploadResult.success}
            </div>

            {uploadResult.failed?.length > 0 && (
              <div className="text-red-600">
                ❌ Failed: {uploadResult.failed.length}
                <ul className="mt-2 list-disc list-inside text-xs">
                  {uploadResult.failed.map((f, i) => (
                    <li key={i}>
                      {f.admissionNo || "Unknown"} — {f.error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
      >
        {/* Left Side: Personal & Guardian Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
            {/* Student Info */}
            <section className="space-y-5">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <User size={16} /> Student Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Admission No
                  </label>
                  <div className="relative">
                    <Hash
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      name="admissionNo"
                      value={form.admissionNo}
                      onChange={handleChange}
                      placeholder="ADM-001"
                      className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-mono text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="date"
                      name="dob"
                      value={form.dob}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                      Class
                    </label>
                    <select
                      name="class"
                      value={form.class}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none text-sm font-bold"
                    >
                      <option value="">Select</option>
                      {classes.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                      Section
                    </label>
                    <input
                      name="section"
                      value={form.section}
                      onChange={handleChange}
                      placeholder="A"
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none text-sm"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Guardian Info */}
            <section className="space-y-5 pt-6 border-t border-slate-50">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Users size={16} /> Family Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Father's Name
                  </label>
                  <input
                    name="fatherName"
                    value={form.fatherName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-blue-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Mother's Name
                  </label>
                  <input
                    name="motherName"
                    value={form.motherName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-blue-400"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right Side: Billing & Submission */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <School size={16} /> Billing
            </h3>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                Fee Starts From
              </label>
              <select
                name="feeStartMonth"
                value={form.feeStartMonth}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-semibold outline-none"
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
                ].map((m, i) => (
                  <option key={i + 1} value={i + 1}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4 border-t">
              <label className="flex items-center gap-3 cursor-pointer group mb-4">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="transportOpted"
                    checked={form.transportOpted}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <div className="w-10 h-6 bg-slate-200 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                </div>
                <span className="text-sm font-bold text-slate-700">
                  Transport Service
                </span>
              </label>

              {form.transportOpted && (
                <div className="animate-in zoom-in-95 duration-200">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="transportFee"
                      value={form.transportFee}
                      onChange={handleChange}
                      placeholder="Annual Fee"
                      className="w-full bg-blue-50/50 border border-blue-100 pl-9 pr-4 py-3 rounded-xl font-bold text-blue-700 outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex gap-3 text-xs font-bold border border-red-100">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          {message && (
            <div className="p-4 bg-green-50 text-green-700 rounded-2xl flex gap-3 text-xs font-bold border border-green-100">
              <CheckCircle2 size={16} /> {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Enroll Student"}
          </button>
        </div>
      </form>
    </div>
  );
}
