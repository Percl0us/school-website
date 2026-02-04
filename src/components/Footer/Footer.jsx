export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        
        {/* School Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Tagore Public School
          </h3>
          <p className="text-sm">
            Affiliated to HBSE <br />
            Classes LKG to XII
          </p>
        </div>

        {/* Contact Details */}
        <div>
          <h4 className="font-semibold text-white mb-2">
            Contact Us
          </h4>
          <p className="text-sm">
            Address: Tagore Public School,Kalkha,Panipat,Haryana <br />
            Phone: +91-8816000512 <br />
            Email: tagorekalkha@gmail.com
          </p>
        </div>

        {/* Quick Note */}
        <div>
          <h4 className="font-semibold text-white mb-2">
            School Office
          </h4>
          <p className="text-sm">
            Office Hours: <br />
            Monday to Saturday <br />
            8:00 AM – 2:00 PM
          </p>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Tagore Public School. All rights reserved.
      </div>
    </footer>
  )
}
