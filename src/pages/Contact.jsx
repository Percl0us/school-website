import ContactEnquiryForm from "../components/ContactEnquiryForm/ContactEnquiryForm";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function Contact() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-20 space-y-12 md:space-y-20">
      {/* Page Header - responsive */}
      <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[3rem] bg-gray-900 text-white overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 md:w-8 h-1 bg-blue-500 rounded-full" />
            <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">
              Get In Touch
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight">
            Contact Us
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Have questions about admissions or school life? Our dedicated team
            is here to assist you. Visit us or drop a message below.
          </p>
        </div>
        {/* Hide oversized icon on mobile to avoid horizontal scroll */}
        <div className="absolute top-[-20%] right-[-10%] opacity-10 hidden md:block">
          <Send size={400} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
        {/* Left Column: Contact Details & Map */}
        <div className="space-y-10 md:space-y-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center gap-3">
              School <span className="text-blue-600">Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {/* Address Card */}
              <div className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-blue-50 border border-blue-100 hover:shadow-lg transition-shadow">
                <MapPin className="text-blue-600 mb-3 md:mb-4" size={24} />
                <h3 className="font-bold text-gray-900 mb-1">Location</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Tagore Public School,
                  <br />
                  Kalkha, Panipat, Haryana
                </p>
              </div>

              {/* Phone/Email Card */}
              <div className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-gray-50 border border-gray-200 hover:shadow-lg transition-shadow">
                <Phone className="text-blue-600 mb-3 md:mb-4" size={24} />
                <h3 className="font-bold text-gray-900 mb-1">Communication</h3>
                <p className="text-gray-600 text-sm break-all">
                  +91-8816000512
                  <br />
                  tagorekalkha@gmail.com
                </p>
              </div>

              {/* Working Hours Card - spans full width on mobile/small */}
              <div className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-gray-50 border border-gray-200 hover:shadow-lg transition-shadow sm:col-span-2">
                <div className="flex items-start gap-3 md:gap-4">
                  <Clock className="text-blue-600 shrink-0" size={24} />
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

          {/* Map Container - responsive height and border */}
          <div className="relative rounded-xl md:rounded-[2.5rem] overflow-hidden border-4 md:border-8 border-gray-100 shadow-inner group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.953036111588!2d76.84092749999999!3d29.342372100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ddd69cfaac1e9%3A0xd71ac98281bf4c0d!2sTagore%20Public%20School!5e0!3m2!1sen!2sin!4v1773409573655!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="School Location Map"
              className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 md:h-[400px]"
            />
          </div>
        </div>

        {/* Right Column: Enquiry Form */}
        <div className="relative">
          <div className="sticky top-24">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center gap-3">
              Send an <span className="text-blue-600">Enquiry</span>
            </h2>

            <div className="p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-[3rem] bg-white border border-gray-100 shadow-2xl relative overflow-hidden">
              {/* Decorative Blue Glow - reduced size on mobile */}
              <div className="absolute -top-20 -right-20 w-32 h-32 md:w-48 md:h-48 bg-blue-100 rounded-full blur-3xl opacity-50" />

              <div className="relative z-10">
                <p className="text-gray-500 text-sm md:text-base mb-6 md:mb-8">
                  Fill out the form below and our admissions office will get
                  back to you within 24 hours.
                </p>
                <ContactEnquiryForm />
              </div>
            </div>

            {/* Direct Support Card - responsive */}
            <div className="mt-6 md:mt-8 p-5 md:p-6 bg-blue-600 rounded-2xl md:rounded-3xl text-white flex items-center gap-4 md:gap-6">
              <div className="p-2 md:p-3 bg-white/20 rounded-xl md:rounded-2xl">
                <Mail size={20} className="md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-blue-100 text-xs md:text-sm">Direct Support</p>
                <p className="font-bold text-sm md:text-base break-all">tagorekalkha@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}