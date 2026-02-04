import { ACADEMIC_MONTHS } from "./constant.js";

const styles = {
  PAID: "bg-green-50 border-green-300 text-green-700",
  OVERDUE: "bg-red-100 border-red-400 text-red-800",
  CURRENT: "bg-orange-50 border-orange-300 text-orange-700",
  UPCOMING: "bg-gray-50 border-gray-200 text-gray-600",
  NA: "bg-gray-100 border-gray-200 text-gray-400",
};

export default function MonthGrid({
  selectedMonths,
  setSelectedMonths,
  earliestUnpaidMonth,
  getMonthStatus,
  setWarning,
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="font-semibold mb-4">Monthly Fee Status</h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {ACADEMIC_MONTHS.map((month) => {
          const status = getMonthStatus(month);
          const selectable = status === "OVERDUE" || status === "CURRENT";
          const selected = selectedMonths.includes(month.key);

          return (
            <div
              key={month.key}
              onClick={() => {
                if (!selectable) return;

                /* =========================
                   ✅ UNSELECT (only last)
                ========================= */
                if (selected) {
                  const lastSelected =
                    selectedMonths[selectedMonths.length - 1];

                  if (month.key !== lastSelected) {
                    setWarning(
                      "You can only unselect the most recently selected month"
                    );
                    return;
                  }

                  setWarning("");
                  setSelectedMonths((prev) =>
                    prev.slice(0, prev.length - 1)
                  );
                  return;
                }

                /* =========================
                   ❌ Skip earliest unpaid
                ========================= */
                if (
                  earliestUnpaidMonth &&
                  selectedMonths.length === 0 &&
                  month.key !== earliestUnpaidMonth
                ) {
                  setWarning(
                    `Please clear fees from ${earliestUnpaidMonth} first`
                  );
                  return;
                }

                /* =========================
                   ❌ Break consecutiveness
                ========================= */
                if (selectedMonths.length > 0) {
                  const lastIndex =
                    ACADEMIC_MONTHS.find(
                      (m) =>
                        m.key ===
                        selectedMonths[selectedMonths.length - 1]
                    ).index;

                  if (month.index !== lastIndex + 1) {
                    setWarning(
                      "Please select months in order without skipping"
                    );
                    return;
                  }
                }

                /* =========================
                   ✅ Valid select
                ========================= */
                setWarning("");
                setSelectedMonths((prev) => [...prev, month.key]);
              }}
              className={`border rounded p-3 text-center text-sm cursor-pointer
                ${styles[status]}
                ${selectable ? "hover:ring-2 hover:ring-blue-300" : ""}
                ${selected ? "ring-2 ring-blue-600" : ""}
              `}
            >
              <div className="font-semibold">{month.key}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
