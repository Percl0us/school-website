import ContactEnquiryForm from "../components/ContactEnquiryForm/ContactEnquiryForm";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function Contact() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 space-y-20">
      {/* Page Header */}
      <div className="relative p-10 rounded-[3rem] bg-gray-900 text-white overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-1 bg-blue-500 rounded-full" />
            <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">
              Get In Touch
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Contact Us
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Have questions about admissions or school life? Our dedicated team
            is here to assist you. Visit us or drop a message below.
          </p>
        </div>
        <div className="absolute top-[-20%] right-[-10%] opacity-10">
          <Send size={400} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left Column: Contact Details & Map */}
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              School <span className="text-blue-600">Details</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Address Card */}
              <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 hover:shadow-lg transition-shadow">
                <MapPin className="text-blue-600 mb-4" size={28} />
                <h3 className="font-bold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Tagore Public School,
                  <br />
                  Kalkha, Panipat, Haryana
                </p>
              </div>

              {/* Phone/Email Card */}
              <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 hover:shadow-lg transition-shadow">
                <Phone className="text-blue-600 mb-4" size={28} />
                <h3 className="font-bold text-gray-900 mb-2">Communication</h3>
                <p className="text-gray-600 text-sm">
                  +91-8816000512
                  <br />
                  tagorekalkha@gmail.com
                </p>
              </div>

              {/* Working Hours Card */}
              <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 hover:shadow-lg transition-shadow sm:col-span-2">
                <div className="flex items-start gap-4">
                  <Clock className="text-blue-600" size={28} />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Office Hours
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Monday to Saturday:{" "}
                      <span className="font-semibold">8:00 AM – 2:00 PM</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-gray-100 shadow-inner group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.953036111588!2d76.84092749999999!3d29.342372100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ddd69cfaac1e9%3A0xd71ac98281bf4c0d!2sTagore%20Public%20School!5e0!3m2!1sen!2sin!4v1773409573655!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="School Location Map"
              className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* Right Column: Enquiry Form */}
        <div className="relative">
          <div className="sticky top-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              Send an <span className="text-blue-600">Enquiry</span>
            </h2>

            <div className="p-8 md:p-10 rounded-[3rem] bg-white border border-gray-100 shadow-2xl relative overflow-hidden">
              {/* Decorative Blue Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-50" />

              <div className="relative z-10">
                <p className="text-gray-500 mb-8">
                  Fill out the form below and our admissions office will get
                  back to you within 24 hours.
                </p>
                <ContactEnquiryForm />
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-600 rounded-3xl text-white flex items-center gap-6">
              <div className="p-3 bg-white/20 rounded-2xl">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-blue-100 text-sm">Direct Support</p>
                <p className="font-bold">tagorekalkha@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
