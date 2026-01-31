import { useState } from "react";
const ADMISSIONS_API_URL =
  "https://script.google.com/macros/s/AKfycbwR_NnQYKtotEjMdhnomRUBQpSwyn1GvmQkb93hs_gD88i1LUgHIaqTkHXxlMmPXk9z6Q/exec";
function Spinner() {
  return (
    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
  );
}

export default function AdmissionForm() {
  const [student, setStudent] = useState({
    name: "",
    gender: "",
    dob: "",
    classApplying: "",
  });
  const [parent, setParent] = useState({
    fatherName: "",
    motherName: "",
    phone: "",
    email: "",
  });
  const [address, setAddress] = useState({
    city: "",
    state: "",
    pincode: "",
  });
  const [academic, setAcademic] = useState({
    lastClass: "",
    board: "",
    medium: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ VALIDATIONS FIRST
    if (!student.name.trim()) {
      setError("Please enter the student’s name.");
      return;
    }

    if (!student.classApplying) {
      setError("Please select the class for admission.");
      return;
    }

    if (!parent.phone.trim()) {
      setError("Please enter a contact number.");
      return;
    }

    // ✅ ONLY NOW mark as submitting
    setSubmitting(true);

    const payload = {
      studentName: student.name,
      gender: student.gender,
      dob: student.dob,
      classApplying: student.classApplying,
      fatherName: parent.fatherName,
      motherName: parent.motherName,
      phone: parent.phone,
      email: parent.email,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      lastClass: academic.lastClass,
      board: academic.board,
      medium: academic.medium,
    };

    try {
      await fetch(ADMISSIONS_API_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await new Promise((res) => setTimeout(res, 1000));
      setSubmitted(true);
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const showAcademicSection =
    student.classApplying !== "LKG" &&
    student.classApplying !== "UKG" &&
    student.classApplying !== "";

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-800 p-4 rounded mb-6">
          <p className="font-medium">⚠️ {error}</p>
        </div>
      )}

      {submitted && (
        <div className="bg-green-100 border border-green-400 text-green-800 p-4 rounded mb-6">
          <p className="font-semibold">
            ✅ Admission enquiry submitted successfully
          </p>
          <p className="text-sm mt-1">
            Our school office will contact you shortly regarding the next steps.
          </p>
        </div>
      )}

      {/* Student Details */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Student Details</h3>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Student Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Student Full Name
            </label>
            <input
              type="text"
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              value={student.gender}
              onChange={(e) =>
                setStudent({ ...student, gender: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              value={student.dob}
              onChange={(e) => setStudent({ ...student, dob: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Class Applying For */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Class Applying For
            </label>
            <select
              value={student.classApplying}
              onChange={(e) =>
                setStudent({ ...student, classApplying: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select</option>
              <option value="LKG">LKG</option>
              <option value="UKG">UKG</option>
              <option value="I">Class I</option>
              <option value="II">Class II</option>
              <option value="III">Class III</option>
              <option value="IV">Class IV</option>
              <option value="V">Class V</option>
              <option value="VI">Class VI</option>
              <option value="VII">Class VII</option>
              <option value="VIII">Class VIII</option>
              <option value="IX">Class IX</option>
              <option value="X">Class X</option>
              <option value="XI">Class XI</option>
              <option value="XII">Class XII</option>
            </select>
          </div>
        </div>
      </div>
      {/* Parent / Guardian Details */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Parent / Guardian Details
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Father's Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Father’s Name
            </label>
            <input
              type="text"
              value={parent.fatherName}
              onChange={(e) =>
                setParent({ ...parent, fatherName: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Mother's Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Mother’s Name
            </label>
            <input
              type="text"
              value={parent.motherName}
              onChange={(e) =>
                setParent({ ...parent, motherName: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              value={parent.phone}
              onChange={(e) => setParent({ ...parent, phone: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={parent.email}
              onChange={(e) => setParent({ ...parent, email: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      </div>
      {/* Address Details */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Address Details</h3>

        <div className="grid gap-6 md:grid-cols-3">
          {/* City / Village */}
          <div>
            <label className="block text-sm font-medium mb-1">
              City / Village
            </label>
            <input
              type="text"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              type="text"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Pin Code */}
          <div>
            <label className="block text-sm font-medium mb-1">Pin Code</label>
            <input
              type="text"
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      </div>
      {showAcademicSection && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Academic Background</h3>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Last Class Passed */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Class Passed
              </label>
              <input
                type="text"
                value={academic.lastClass}
                onChange={(e) =>
                  setAcademic({ ...academic, lastClass: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Board */}
            <div>
              <label className="block text-sm font-medium mb-1">Board</label>
              <input
                type="text"
                value={academic.board}
                onChange={(e) =>
                  setAcademic({ ...academic, board: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Medium of Instruction */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Medium of Instruction
              </label>
              <input
                type="text"
                value={academic.medium}
                onChange={(e) =>
                  setAcademic({ ...academic, medium: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        </div>
      )}
      {/* Final Confirmation */}
      <div className="border-t pt-6">
        <p className="text-sm text-gray-600 mb-4">
          This is an admission enquiry. After submission, the school office will
          contact you for further steps.
        </p>

        <button
          type="submit"
          disabled={submitting || submitted}
          className={`px-6 py-3 rounded font-medium text-white transition flex items-center gap-2 justify-center ${
            submitting || submitted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-800"
          }`}
        >
          {submitting && <Spinner />}

          {submitting
            ? "Submitting..."
            : submitted
              ? "Submitted"
              : "Submit Admission Enquiry"}
        </button>
      </div>
    </form>
  );
}
