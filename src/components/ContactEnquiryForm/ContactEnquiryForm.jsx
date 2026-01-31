import { useState } from "react";
const CONTACT_API_URL =
  "https://script.google.com/macros/s/AKfycbw_mXlVHGwyoGA0EW3qTIY3T6cBKSjotv70feyWT6vosGHV6cxK5_zYgta0qmv0R35NHA/exec";
function Spinner() {
  return (
    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
  );
}

export default function ContactEnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const name = e.target[0].value.trim();
    const phone = e.target[1].value.trim();
    const message = e.target[2].value.trim();

    // ✅ VALIDATIONS FIRST
    if (!name) {
      setError("Please enter your name.");
      return;
    }

    if (!phone) {
      setError("Please enter a contact number.");
      return;
    }

    if (!message) {
      setError("Please enter your message.");
      return;
    }

    // ✅ ONLY NOW mark as submitting
    setSubmitting(true);

    const payload = {
      name,
      phone,
      message,
    };

    try {
      await fetch(CONTACT_API_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await new Promise((res) => setTimeout(res, 800));
      setSubmitted(true);
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-800 p-4 rounded mb-6">
          <p className="font-medium">⚠️ {error}</p>
        </div>
      )}

      {submitted && (
        <div className="bg-green-50 border border-green-300 p-4 rounded text-green-800">
          Thank you for contacting us. We will get back to you shortly.
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Your Name</label>
        <input type="text" className="w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Contact Number</label>
        <input type="tel" className="w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Your Message</label>
        <textarea
          rows="4"
          className="w-full border rounded px-3 py-2"
        ></textarea>
      </div>

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

        {submitting ? "Sending..." : submitted ? "Sent" : "Send Enquiry"}
      </button>
    </form>
  );
}
