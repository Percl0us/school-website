import ContactEnquiryForm from "../components/ContactEnquiryForm/ContactEnquiryForm";

export default function Contact() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <p className="text-gray-700 max-w-3xl">
          For any queries regarding admissions, academics, or school activities,
          parents are welcome to contact the school office during working hours.
        </p>
      </div>

      {/* Contact Details */}
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            School Contact Details
          </h2>
          <p className="text-gray-700">
            <strong>Address:</strong> <br />
            Tagore Public School, <br />
            Kalkha,Panipat,Haryana
          </p>

          <p className="text-gray-700 mt-4">
            <strong>Phone:</strong> +91-8816000512 <br />
            <strong>Email:</strong> tagorekalkha@gmail.com
          </p>

          <p className="text-gray-700 mt-4">
            <strong>Office Hours:</strong> <br />
            Monday to Saturday <br />
            8:00 AM – 2:00 PM
          </p>
        </div>

        {/* Map Placeholder */}
        <div className="mt-8 rounded overflow-hidden border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.953036111588!2d76.84092749999999!3d29.342372100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ddd69cfaac1e9%3A0xd71ac98281bf4c0d!2sTagore%20Public%20School!5e0!3m2!1sen!2sin!4v1769860767842!5m2!1sen!2sin"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="School Location Map"
          />
        </div>
      </div>
      {/* Enquiry Form */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>

        <div className="border rounded p-6 bg-gray-50 max-w-xl">
          <ContactEnquiryForm />
        </div>
      </div>
    </section>
  );
}
