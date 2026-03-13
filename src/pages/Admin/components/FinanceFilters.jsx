export default function FinanceFilters({
  filters,
  setFilters,
}) {
  return (
    <div className="bg-white p-4 shadow rounded flex flex-wrap gap-4 items-center">
      <input
        type="text"
        placeholder="Search by student name"
        value={filters.search}
        onChange={(e) =>
          setFilters({
            ...filters,
            search: e.target.value,
          })
        }
        className="border px-2 py-1 rounded"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={filters.balanceOnly}
          onChange={(e) =>
            setFilters({
              ...filters,
              balanceOnly: e.target.checked,
            })
          }
        />
        Only With Balance
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={filters.discountOnly}
          onChange={(e) =>
            setFilters({
              ...filters,
              discountOnly: e.target.checked,
            })
          }
        />
        Only With Active Discount
      </label>

      <select
        value={filters.sortBy}
        onChange={(e) =>
          setFilters({
            ...filters,
            sortBy: e.target.value,
          })
        }
        className="border px-2 py-1 rounded"
      >
        <option value="BALANCE_DESC">
          Highest Balance
        </option>
        <option value="BALANCE_ASC">
          Lowest Balance
        </option>
        <option value="NAME_ASC">
          Name A-Z
        </option>
        <option value="NAME_DESC">
          Name Z-A
        </option>
      </select>
    </div>
  );
}