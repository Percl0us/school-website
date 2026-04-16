import { RefreshCw, Search } from "lucide-react";

export default function StudentManagementToolbar({
  academicYear,
  classFilter,
  filterOptions,
  loading,
  onRefresh,
  onSearchChange,
  onClassFilterChange,
  search,
}) {
  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Student Management
          </h1>
          <p className="text-sm text-slate-500">
            Edit profiles, update marks, and remove student records for {academicYear}.
          </p>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search by student, admission no, father, mother"
            value={search}
            onChange={onSearchChange}
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>

        <select
          value={classFilter}
          onChange={onClassFilterChange}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none"
        >
          {filterOptions.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
