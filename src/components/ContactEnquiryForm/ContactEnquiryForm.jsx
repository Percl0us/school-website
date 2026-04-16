import { useState, useEffect, useRef } from "react";
import { Send, CheckCircle, AlertCircle, Loader2, Sparkles, User, Phone, MessageCircle } from "lucide-react";

const CONTACT_API_URL =
  "https://script.google.com/macros/s/AKfycbw_mXlVHGwyoGA0EW3qTIY3T6cBKSjotv70feyWT6vosGHV6cxK5_zYgta0qmv0R35NHA/exec";

// Scroll Reveal Wrapper (consistent with other pages)
const RevealOnScroll = ({ children, delay = "0ms", className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`transform transition-all duration-1000 ${className} ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-12 opacity-0 scale-95"
      }`}
    >
      {children}
    </div>
  );
};

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
      setFormData({ name: "", phone: "", message: "" });
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RevealOnScroll>
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Decorative gradient blob */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50" />
        
        <div className="relative z-10 p-6 sm:p-8">
          {/* Header with sparkle */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-1.5 mb-3">
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                We're Here to Help
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              We&apos;d Love to Hear from You
            </h2>
            <p className="text-gray-500 text-sm mt-2">Questions, visits, admissions, or school updates, we are here to help.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Alert */}
            {error && (
              <div className="flex items-center gap-3 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 text-red-800 px-5 py-3 rounded-xl text-sm shadow-sm">
                <AlertCircle size={18} className="text-red-500 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Success Alert */}
            {submitted && (
              <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 text-green-800 px-5 py-3 rounded-xl text-sm shadow-sm">
                <CheckCircle size={18} className="text-green-500 shrink-0" />
                <span className="font-medium">Thank you for reaching out. Our team will get back to you shortly with a helpful response.</span>
              </div>
            )}

            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                Your Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
                  placeholder="Your full name"
                  disabled={submitted}
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
                  placeholder="+91 98765 43210"
                  disabled={submitted}
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                Your Message <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MessageCircle size={18} className="absolute left-3 top-4 text-gray-400" />
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none resize-none"
                  placeholder="Tell us how we can help you"
                  disabled={submitted}
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || submitted}
              className={`w-full py-3.5 rounded-xl font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${
                submitting || submitted
                  ? "bg-gray-400 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending your message...
                </>
              ) : submitted ? (
                <>
                  <CheckCircle size={18} />
                  Message Sent ✓
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </RevealOnScroll>
  );
}
