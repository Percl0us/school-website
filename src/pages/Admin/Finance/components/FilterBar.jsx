export default function FilterBar({
  search,
  setSearch,
  classFilter,
  setClassFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  classes,
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 items-center">
      {/* Search */}
      <input
        type="text"
        placeholder="Search name or admission no..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-200 px-4 py-2 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Class Filter */}
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="border border-gray-200 px-3 py-2 rounded-lg bg-white text-sm outline-none focus:border-blue-500"
        >
          <option value="ALL">All Classes</option>
          {classes.map((c) => (
            <option key={c} value={c}>
              Class {c}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 px-3 py-2 rounded-lg bg-white text-sm outline-none focus:border-blue-500"
        >
          <option value="ALL">All Status</option>
          <option value="CLEARED">Cleared</option>
          <option value="REVIEW">Review</option>
          <option value="DUE">Due</option>
        </select>

        {/* Sorting */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-200 px-3 py-2 rounded-lg bg-white text-sm outline-none focus:border-blue-500"
        >
          <option value="NAME">Sort by Name</option>
          <option value="BALANCE">Highest Balance</option>
          <option value="PAID">Highest Paid</option>
        </select>
      </div>
    </div>
  );
}