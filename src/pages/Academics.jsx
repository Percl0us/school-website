import subjects from "../data/subjects";

export default function Academics() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-4">Academics</h1>
        <p className="text-gray-700 max-w-3xl">
          Tagore Public School follows a well-structured academic program designed
          to promote conceptual understanding, critical thinking, and overall
          academic excellence.
        </p>
      </div>

      {/* Curriculum */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Curriculum</h2>
        <p className="text-gray-700 max-w-3xl">
          The school is affiliated with the Haryana Board of School Education
          (HBSE) and follows the prescribed syllabus and examination guidelines
          issued by the board.
        </p>
      </div>

      {/* Classes Offered */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Classes Offered</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Pre-Primary: LKG, UKG</li>
          <li>Primary: Class I to V</li>
          <li>Middle: Class VI to VIII</li>
          <li>Secondary: Class IX to X</li>
          <li>Senior Secondary: Class XI to XII</li>
        </ul>
      </div>
      {/* Subjects Offered */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Subjects Offered</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Pre-Primary (LKG – UKG)
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {subjects.prePrimary.map((sub, i) => (
                <li key={i}>{sub}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Primary (Class I – V)
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {subjects.primary.map((sub, i) => (
                <li key={i}>{sub}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Middle (Class VI – VIII)
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {subjects.middle.map((sub, i) => (
                <li key={i}>{sub}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Secondary (Class IX – X)
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {subjects.secondary.map((sub, i) => (
                <li key={i}>{sub}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Senior Secondary (Class XI – XII)
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {subjects.seniorSecondary.map((sub, i) => (
                <li key={i}>{sub}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Examination & Assessment */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Examination & Assessment System
        </h2>

        <p className="text-gray-700 max-w-3xl mb-4">
          The school follows the examination and evaluation pattern prescribed
          by the Haryana Board of School Education (HBSE). Assessment is
          designed to support continuous learning and academic growth.
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            Periodic assessments and unit tests are conducted throughout the
            year.
          </li>
          <li>Term-end examinations are held as per the academic calendar.</li>
          <li>
            Continuous evaluation focuses on understanding, application, and
            progress.
          </li>
          <li>Promotion criteria follow board and school guidelines.</li>
        </ul>
      </div>
      {/* Class-wise Syllabus Downloads */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          Class-wise Syllabus Downloads
        </h2>

        <p className="text-gray-700 max-w-3xl mb-8">
          Parents and students can download the syllabus prescribed by HBSE for
          each class from the links below.
        </p>

        <div className="space-y-8">
          {/* Pre-Primary */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Pre-Primary</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/downloads/syllabus/pre-primary/lkg.pdf"
                  target="_blank"
                  className="text-blue-700 underline"
                >
                  LKG Syllabus
                </a>
              </li>
              <li>
                <a
                  href="/downloads/syllabus/pre-primary/ukg.pdf"
                  target="_blank"
                  className="text-blue-700 underline"
                >
                  UKG Syllabus
                </a>
              </li>
            </ul>
          </div>

          {/* Primary */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Primary (Class I – V)
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/downloads/syllabus/primary/class-1.pdf"
                  target="_blank"
                  className="text-blue-700 underline"
                >
                  Class I Syllabus
                </a>
              </li>
              <li>
                <a
                  href="/downloads/syllabus/primary/class-2.pdf"
                  target="_blank"
                  className="text-blue-700 underline"
                >
                  Class II Syllabus
                </a>
              </li>
              <li>
                <a
                  href="/downloads/syllabus/primary/class-3.pdf"
                  target="_blank"
                  className="text-blue-700 underline"
                >
                  Class III Syllabus
                </a>
              </li>
              <li>
                <a
                  href="/downloads/syllabus/primary/class-4.pdf"
                  target="_blank"
                  className="text-blue-700 underline"
                >
                  Class IV Syllabus
                </a>
              </li>
              <li>
                <a
                  href="/downloads/syllabus/primary/class-5.pdf"
                  target="_blank"
                  className="text-blue-700 underline"
                >
                  Class V Syllabus
                </a>
              </li>
            </ul>
          </div>

          {/* Middle */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Middle (Class VI – VIII)
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/downloads/syllabus/middle/class-6.pdf"
                  target="_blank"
                  className="text-blue-700 underline"
                >
                  Class VI Syllabus
                </a>
              </li>
              <li>
                <a
                  href="/downloads/syllabus/middle/class-7.pdf"
                  target="_blank"
                  className="text-blue-700 underline"
                >
                  Class VII Syllabus
                </a>
              </li>
              <li>
                <a
                  href="/downloads/syllabus/middle/class-8.pdf"
                  target="_blank"
                  className="text-blue-700 underline"
                >
                  Class VIII Syllabus
                </a>
              </li>
            </ul>
          </div>

          {/* Secondary */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Secondary (Class IX – X)
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/downloads/syllabus/secondary/class-9.pdf"
                  target="_blank"
                  className="text-blue-700 underline"
                >
                  Class IX Syllabus
                </a>
              </li>
              <li>
                <a
                  href="/downloads/syllabus/secondary/class-10.pdf"
                  target="_blank"
                  className="text-blue-700 underline"
                >
                  Class X Syllabus
                </a>
              </li>
            </ul>
          </div>

          {/* Senior Secondary */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Senior Secondary (Class XI – XII)
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/downloads/syllabus/senior-secondary/class-11.pdf"
                  target="_blank"
                  className="text-blue-700 underline"
                >
                  Class XI Syllabus
                </a>
              </li>
              <li>
                <a
                  href="/downloads/syllabus/senior-secondary/class-12.pdf"
                  target="_blank"
                  className="text-blue-700 underline"
                >
                  Class XII Syllabus
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
