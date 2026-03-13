import { Link } from "react-router-dom";

export default function FinanceStudentTable({
  accounts,
}) {
  return (
    <div className="bg-white shadow rounded p-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th>Name</th>
            <th>Total Fee</th>
            <th>Paid</th>
            <th>Balance</th>
            <th>Active Discount</th>
            <th>Pending</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((acc) => (
            <tr
              key={acc.id}
              className="border-b"
            >
              <td>{acc.student.name}</td>
              <td>₹{acc.totalFee}</td>
              <td className="text-green-600">
                ₹{acc.totalPaid}
              </td>
              <td className="text-red-600">
                ₹{acc.balance}
              </td>
              <td>
                ₹{acc.activeDiscount}
              </td>
              <td>
                {acc.pendingPayments}
              </td>
              <td>
                <Link
                  to={`/admin/students/${acc.admissionNo}/${acc.academicYear}/finance`}
                  className="text-blue-600 underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}