export default function Downloads() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 space-y-16">

      <h1 className="text-4xl font-semibold tracking-tight">
        Downloads
      </h1>

      {/* Prospectus */}
      <div>
        <h2 className="text-3xl font-semibold mb-4 text-red-900">
          School Prospectus
        </h2>
        <ul>
          <li>
            <a
              href="/downloads/prospectus/school-prospectus.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline"
            >
              Download School Prospectus (PDF)
            </a>
          </li>
        </ul>
      </div>

      {/* Syllabus */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-red-900">
          Syllabus
        </h2>

        <div className="space-y-6">

          <div>
            <h3 className="font-semibold mb-2">Pre-Primary</h3>
            <ul className="space-y-1">
              <li><a href="/downloads/syllabus/pre-primary/lkg.pdf" target="_blank" className="text-blue-700 underline">LKG Syllabus</a></li>
              <li><a href="/downloads/syllabus/pre-primary/ukg.pdf" target="_blank" className="text-blue-700 underline">UKG Syllabus</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Primary (Class I – V)</h3>
            <ul className="space-y-1">
              <li><a href="/downloads/syllabus/primary/class-1.pdf" target="_blank" className="text-blue-700 underline">Class I</a></li>
              <li><a href="/downloads/syllabus/primary/class-2.pdf" target="_blank" className="text-blue-700 underline">Class II</a></li>
              <li><a href="/downloads/syllabus/primary/class-3.pdf" target="_blank" className="text-blue-700 underline">Class III</a></li>
              <li><a href="/downloads/syllabus/primary/class-4.pdf" target="_blank" className="text-blue-700 underline">Class IV</a></li>
              <li><a href="/downloads/syllabus/primary/class-5.pdf" target="_blank" className="text-blue-700 underline">Class V</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Middle (Class VI – VIII)</h3>
            <ul className="space-y-1">
              <li><a href="/downloads/syllabus/middle/class-6.pdf" target="_blank" className="text-blue-700 underline">Class VI</a></li>
              <li><a href="/downloads/syllabus/middle/class-7.pdf" target="_blank" className="text-blue-700 underline">Class VII</a></li>
              <li><a href="/downloads/syllabus/middle/class-8.pdf" target="_blank" className="text-blue-700 underline">Class VIII</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Secondary & Senior Secondary</h3>
            <ul className="space-y-1">
              <li><a href="/downloads/syllabus/secondary/class-9.pdf" target="_blank" className="text-blue-700 underline">Class IX</a></li>
              <li><a href="/downloads/syllabus/secondary/class-10.pdf" target="_blank" className="text-blue-700 underline">Class X</a></li>
              <li><a href="/downloads/syllabus/senior-secondary/class-11.pdf" target="_blank" className="text-blue-700 underline">Class XI</a></li>
              <li><a href="/downloads/syllabus/senior-secondary/class-12.pdf" target="_blank" className="text-blue-700 underline">Class XII</a></li>
            </ul>
          </div>

        </div>
      </div>

    </section>
  )
}
