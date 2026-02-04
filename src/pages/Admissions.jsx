import { useState } from "react";
import AdmissionForm from "../components/AdmissionForm/AdmissionForm";
import ProspectusModal from "../components/modal/ProspectusModal";
import prospectusImage from "../assets/images/prospectus.jpg";

export default function Admissions() {
  const [showProspectus, setShowProspectus] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      {/* Prospectus Preview */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">
          School Prospectus
        </h2>

        <p className="text-gray-700 mb-4">
          An overview of the school’s academic philosophy, facilities, and
          admission guidelines.
        </p>

        <div className="flex justify-center">
          <img
            src={prospectusImage}
            alt="School Prospectus"
            className="max-w-full md:max-w-lg rounded shadow cursor-pointer hover:shadow-lg transition"
            onClick={() => setShowProspectus(true)}
          />
        </div>

        <p className="text-sm text-gray-600 mt-3 text-center">
          Click on the image to view the full prospectus
        </p>
      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-semibold mb-4">Admissions</h1>
        <p className="text-gray-700 max-w-3xl">
          Admissions are open for classes LKG to Class XII for the academic
          session 2026–27. Parents are requested to go through the admission
          process and guidelines carefully.
        </p>
      </div>

      {/* Admission Process */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Admission Process</h2>

        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li>Fill the online admission enquiry form.</li>
          <li>
            The school office will contact parents for further interaction.
          </li>
          <li>Submission of required documents.</li>
          <li>Confirmation of admission after verification.</li>
        </ol>
      </div>

      {/* Fee Structure */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Fee Structure (Indicative)
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Class</th>
                <th className="border px-4 py-2">Monthly Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">LKG – UKG</td>
                <td className="border px-4 py-2">₹ X,XXX</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Class I – V</td>
                <td className="border px-4 py-2">₹ X,XXX</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Class VI – VIII</td>
                <td className="border px-4 py-2">₹ X,XXX</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Class IX – XII</td>
                <td className="border px-4 py-2">₹ X,XXX</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          * Fees are subject to change. Transport charges are additional.
        </p>
      </div>

      {/* Admission Form */}
      <div>
        <h2 className="text-2xl font-medium mb-4">Admission Enquiry Form</h2>

        <div className="border rounded p-6 bg-gray-50">
          <AdmissionForm />
        </div>
      </div>

      {/* Prospectus Modal */}
      {showProspectus && (
        <ProspectusModal
          image={prospectusImage}
          onClose={() => setShowProspectus(false)}
        />
      )}
    </section>
  );
}
