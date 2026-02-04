export default function ReceiptPrint({ payment, student, academic }) {
  return (
    <div className="p-6 text-sm text-black">
      <h1 className="text-lg font-semibold mb-4 text-center">
        School Fee Receipt
      </h1>

      <div className="space-y-2 mb-4">
        <div><strong>Receipt No:</strong> {payment.receiptNumber}</div>
        <div>
          <strong>Date:</strong>{" "}
          {new Date(payment.createdAt).toLocaleDateString()}
        </div>
        <div><strong>Payment Mode:</strong> {payment.mode}</div>
        <div><strong>Amount Paid:</strong> ₹{payment.amount}</div>
      </div>

      {payment.monthsCovered?.length > 0 && (
        <div className="mb-4">
          <strong>Months Covered:</strong>
          <div className="mt-1">
            {payment.monthsCovered.join(", ")}
          </div>
        </div>
      )}

      <div className="border-t pt-3 text-xs">
        <div><strong>Student:</strong> {student.name}</div>
        <div><strong>Admission No:</strong> {student.admissionNo}</div>
        <div><strong>Class:</strong> {academic.class}{academic.section ? `-${academic.section}` : ""}</div>
        <div><strong>Academic Year:</strong> {academic.academicYear}</div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500">
        This is a system-generated receipt.
      </div>
    </div>
  );
}
