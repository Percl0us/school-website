import { useState } from "react";

const CONTACT_API_URL =
  "https://script.google.com/macros/s/AKfycbw_mXlVHGwyoGA0EW3qTIY3T6cBKSjotv70feyWT6vosGHV6cxK5_zYgta0qmv0R35NHA/exec";

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
  );
}

export default function ContactEnquiryForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, phone, message } = formData;

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter a contact number.");
      return;
    }
    if (!message.trim()) {
      setError("Please enter your message.");
      return;
    }

    setSubmitting(true);

    const payload = { name: name.trim(), phone: phone.trim(), message: message.trim() };

    try {
      await fetch(CONTACT_API_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      await new Promise((res) => setTimeout(res, 800));
      setSubmitted(true);
      setFormData({ name: "", phone: "", message: "" }); // clear form on success
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Get in touch</h2>
        <p className="text-gray-500 text-sm mt-1">We'll reply within 24 hours</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}

        {submitted && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg text-sm">
            ✅ Thank you for contacting us. We will get back to you shortly.
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
            placeholder="John Doe"
            disabled={submitted}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
            placeholder="+91 98765 43210"
            disabled={submitted}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none resize-none"
            placeholder="How can we help you?"
            disabled={submitted}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting || submitted}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${
            submitting || submitted
              ? "bg-gray-400 cursor-not-allowed shadow-none"
              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-[0.98]"
          }`}
        >
          {submitting && <Spinner />}
          {submitting ? "Sending..." : submitted ? "Message Sent ✓" : "Send Enquiry"}
        </button>
      </form>
    </div>
  );
}