import { Download, FileText, FolderOpen } from "lucide-react";
import { FloatingImageField } from "../components/shared/FloatingImageField";
import { pageImageMosaics } from "../data/pageImageMosaics";

export default function Downloads() {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <div className="relative isolate">
        <FloatingImageField {...pageImageMosaics.downloads} />
        <section className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-8 text-white shadow-2xl sm:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(249,115,22,0.14),_transparent_30%)]" />
          <div className="relative z-10 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
              <FolderOpen size={14} />
              Resource Centre
            </div>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              Downloads
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-blue-100 sm:text-lg">
              Prospectus and syllabus files are organized here so families can quickly access important school documents.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                <FileText size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">School Prospectus</h2>
                <p className="text-sm text-slate-500">General admission and school overview</p>
              </div>
            </div>

            <a
              href="/downloads/prospectus/school-prospectus.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Download size={18} />
              Download School Prospectus (PDF)
            </a>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Syllabus</h2>
              <p className="mt-2 text-sm text-slate-500">
                Download class-wise academic resources by section.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-slate-800">Pre-Primary</h3>
                <div className="flex flex-wrap gap-3">
                  <a href="/downloads/syllabus/pre-primary/lkg.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50">LKG Syllabus</a>
                  <a href="/downloads/syllabus/pre-primary/ukg.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50">UKG Syllabus</a>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-slate-800">Primary (Class I - V)</h3>
                <div className="flex flex-wrap gap-3">
                  <a href="/downloads/syllabus/primary/class-1.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50">Class I</a>
                  <a href="/downloads/syllabus/primary/class-2.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50">Class II</a>
                  <a href="/downloads/syllabus/primary/class-3.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50">Class III</a>
                  <a href="/downloads/syllabus/primary/class-4.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50">Class IV</a>
                  <a href="/downloads/syllabus/primary/class-5.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50">Class V</a>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-slate-800">Middle (Class VI - VIII)</h3>
                <div className="flex flex-wrap gap-3">
                  <a href="/downloads/syllabus/middle/class-6.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50">Class VI</a>
                  <a href="/downloads/syllabus/middle/class-7.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50">Class VII</a>
                  <a href="/downloads/syllabus/middle/class-8.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50">Class VIII</a>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-slate-800">Secondary & Senior Secondary</h3>
                <div className="flex flex-wrap gap-3">
                  <a href="/downloads/syllabus/secondary/class-9.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50">Class IX</a>
                  <a href="/downloads/syllabus/secondary/class-10.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50">Class X</a>
                  <a href="/downloads/syllabus/senior-secondary/class-11.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50">Class XI</a>
                  <a href="/downloads/syllabus/senior-secondary/class-12.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50">Class XII</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      </div>
    </div>
  );
}
