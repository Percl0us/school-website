import { useState, useMemo } from "react";
import api from "../../lib/api";

export default function PaymentTable({
  payments,
  refresh,
}) {
  const [statusFilter, setStatusFilter] =
    useState("ALL");
  const [modeFilter, setModeFilter] =
    useState("ALL");
  const [sortBy, setSortBy] =
    useState("NEWEST");

  const filteredPayments = useMemo(() => {
    let filtered = [...payments];

    if (statusFilter !== "ALL") {
      filtered = filtered.filter(
        (p) => p.status === statusFilter
      );
    }

    if (modeFilter !== "ALL") {
      filtered = filtered.filter(
        (p) => p.mode === modeFilter
      );
    }

    if (sortBy === "NEWEST") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    if (sortBy === "OLDEST") {
      filtered.sort(
        (a, b) =>
          new Date(a.createdAt) -
          new Date(b.createdAt)
      );
    }

    if (sortBy === "HIGH_AMOUNT") {
      filtered.sort((a, b) => b.amount - a.amount);
    }

    if (sortBy === "LOW_AMOUNT") {
      filtered.sort((a, b) => a.amount - b.amount);
    }

    return filtered;
  }, [payments, statusFilter, modeFilter, sortBy]);

  const handleConfirm = async (id) => {
    await api.post(
      `/admin/payments/${id}/confirm`
    );
    refresh();
  };

  const handleReject = async (id) => {
    await api.post(
      `/admin/payments/${id}/reject`
    );
    refresh();
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="font-semibold mb-4">
        Payments
      </h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="border rounded px-2 py-1"
        >
          <option value="ALL">All Status</option>
          <option value="PAYMENT_SUBMITTED">
            Pending
          </option>
          <option value="CONFIRMED">
            Confirmed
          </option>
          <option value="REJECTED">
            Rejected
          </option>
        </select>

        <select
          onChange={(e) =>
            setModeFilter(e.target.value)
          }
          className="border rounded px-2 py-1"
        >
          <option value="ALL">All Modes</option>
          <option value="UPI">UPI</option>
          <option value="CASH">Cash</option>
        </select>

        <select
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          className="border rounded px-2 py-1"
        >
          <option value="NEWEST">
            Newest First
          </option>
          <option value="OLDEST">
            Oldest First
          </option>
          <option value="HIGH_AMOUNT">
            Highest Amount
          </option>
          <option value="LOW_AMOUNT">
            Lowest Amount
          </option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th>Date</th>
            <th>Mode</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Months</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((p) => (
            <tr key={p.id} className="border-b">
              <td>
                {new Date(
                  p.createdAt
                ).toLocaleDateString()}
              </td>
              <td>{p.mode}</td>
              <td>₹{p.amount}</td>
              <td>{p.status}</td>
              <td>
                {Array.isArray(p.monthsCovered)
                  ? p.monthsCovered.join(", ")
                  : ""}
              </td>
              <td>
                {p.status ===
                  "PAYMENT_SUBMITTED" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleConfirm(p.id)
                      }
                      className="px-2 py-1 bg-green-600 text-white rounded"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() =>
                        handleReject(p.id)
                      }
                      className="px-2 py-1 bg-red-600 text-white rounded"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}