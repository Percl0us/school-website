import { useState, Fragment } from "react";
import StudentRow from "./components/StudentRow";
import PaymentDetails from "./components/PaymentDetails";
import ImagePreview from "./components/ImagePreview";

export default function StudentTable({ students, onManage }) {
  const [expanded, setExpanded] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const toggleExpand = (admissionNo) => {
    setExpanded((prev) => (prev === admissionNo ? null : admissionNo));
  };

  if (students.length === 0) {
    return (
      <div className="bg-white p-12 text-center rounded-xl shadow border border-dashed border-gray-200">
        <p className="text-gray-400">No students found matching your filters.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-center text-gray-400 w-12">#</th>
              <th className="p-4 text-gray-600">Admission No</th>
              <th className="p-4 text-gray-600">Student & Parents</th>
              <th className="p-4 text-gray-600">Class</th>
              <th className="p-4 text-gray-600">Total Fee</th>
              <th className="p-4 text-gray-600">Paid</th>
              <th className="p-4 text-gray-600">Balance</th>
              <th className="p-4 text-gray-600">Discount</th>
              <th className="p-4 text-center text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((s, index) => (
              <Fragment key={s.admissionNo}>
                <StudentRow 
                  s={s} 
                  index={index} 
                  isExpanded={expanded === s.admissionNo}
                  onToggle={toggleExpand}
                  onManage={onManage}
                />
                {expanded === s.admissionNo && (
                  <tr>
                    <td colSpan="9" className="bg-gray-50 px-10 py-6">
                      <PaymentDetails payments={s.payments} onPreview={setPreviewImage} />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <ImagePreview imageUrl={previewImage} onClose={() => setPreviewImage(null)} />
    </>
  );
}