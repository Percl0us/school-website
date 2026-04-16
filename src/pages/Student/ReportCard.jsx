import { Download, FileBadge2 } from "lucide-react";
import logo from "../../assets/images/logo.jpg";
import SubjectMarksTable from "./SubjectMarksTable";

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString("en-IN") : "N/A";

const getMarksValue = (subject) =>
  subject.marksObtained ?? subject.marks ?? null;

const getMaxMarksValue = (subject) =>
  subject.maxMarks ?? subject.totalMarks ?? 100;

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const buildPrintableHtml = ({ result, student, academic, summary }) => {
  const subjects = Array.isArray(result.subjects) ? result.subjects : [];
  const rows = subjects
    .map((subject, index) => {
      const marksObtained = getMarksValue(subject);
      const maxMarks = getMaxMarksValue(subject);
      const percentage =
        marksObtained !== null && maxMarks > 0
          ? `${((marksObtained / maxMarks) * 100).toFixed(1)}%`
          : "AB";

      return `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeHtml(subject.name)}</td>
          <td>${marksObtained ?? "AB"}</td>
          <td>${maxMarks}</td>
          <td>${percentage}</td>
          <td>${escapeHtml(subject.grade ?? subject.gradeSymbol ?? "N/A")}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Report Card - ${escapeHtml(student.name)}</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f4f7fb; margin: 0; padding: 24px; color: #102542; }
          .sheet { max-width: 900px; margin: 0 auto; background: white; border: 4px solid #163c7a; box-shadow: 0 16px 40px rgba(22,60,122,.12); }
          .header { display: grid; grid-template-columns: 100px 1fr 100px; gap: 16px; align-items: center; padding: 28px 32px 18px; border-bottom: 2px solid #d8e1f0; }
          .logo { width: 84px; height: 84px; object-fit: cover; border-radius: 16px; }
          .avatar { width: 84px; height: 84px; object-fit: cover; border-radius: 16px; border: 1px solid #d8e1f0; }
          .avatar-fallback { width: 84px; height: 84px; border-radius: 16px; display:flex; align-items:center; justify-content:center; background:#eff4ff; color:#163c7a; font-weight:700; font-size:28px; border:1px solid #d8e1f0; }
          .school { text-align: center; }
          .school h1 { margin: 0; font-size: 30px; letter-spacing: 1.5px; color: #163c7a; }
          .school p { margin: 4px 0; font-size: 13px; color: #4a5f7a; }
          .title { display:inline-block; margin-top:10px; padding:8px 18px; border-radius:999px; background:#163c7a; color:white; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; }
          .details { display:grid; grid-template-columns: repeat(2, 1fr); gap: 14px; padding: 24px 32px; background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%); border-bottom: 1px solid #e3eaf5; }
          .detail { border: 1px solid #dde6f2; border-radius: 14px; padding: 12px 14px; background: white; }
          .detail-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #6c7e99; margin-bottom: 6px; }
          .detail-value { font-size: 16px; font-weight: 700; color: #102542; }
          .content { padding: 24px 32px 12px; }
          table { width:100%; border-collapse: collapse; font-size: 14px; }
          th, td { border: 1px solid #d8e1f0; padding: 10px 12px; text-align: center; }
          th { background:#eef4ff; color:#163c7a; font-weight:700; }
          td:nth-child(2), th:nth-child(2) { text-align:left; }
          .summary { display:grid; grid-template-columns: repeat(4, 1fr); gap: 14px; padding: 18px 32px 28px; }
          .summary-card { border-radius: 16px; padding: 14px 16px; background:#f7faff; border:1px solid #dce6f5; }
          .summary-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color:#6c7e99; margin-bottom:6px; }
          .summary-value { font-size: 22px; font-weight: 700; color:#163c7a; }
          .footer { display:flex; justify-content:space-between; gap:24px; padding: 20px 32px 32px; border-top: 1px solid #e3eaf5; }
          .signature { flex:1; padding-top:24px; border-top: 1px solid #8aa0c0; text-align:center; font-size:13px; color:#4a5f7a; }
          .meta { text-align:right; font-size:12px; color:#6c7e99; }
          @media print {
            body { background: white; padding: 0; }
            .sheet { box-shadow: none; margin: 0; }
          }
        </style>
      </head>
      <body>
        <div class="sheet">
          <div class="header">
            <img class="logo" src="${logo}" alt="School Logo" />
            <div class="school">
              <h1>TAGORE PUBLIC SCHOOL</h1>
              <p>Kalkha, Panipat, Haryana</p>
              <p>Official Academic Report Card</p>
              <div class="title">Session ${escapeHtml(result.academicYear)}</div>
            </div>
            ${
              student.profileImageUrl
                ? `<img class="avatar" src="${student.profileImageUrl}" alt="${escapeHtml(
                    student.name,
                  )}" />`
                : `<div class="avatar-fallback">${escapeHtml(
                    student.name
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((part) => part[0]?.toUpperCase())
                      .join(""),
                  )}</div>`
            }
          </div>

          <div class="details">
            <div class="detail"><div class="detail-label">Student Name</div><div class="detail-value">${escapeHtml(student.name)}</div></div>
            <div class="detail"><div class="detail-label">Admission No</div><div class="detail-value">${escapeHtml(student.admissionNo)}</div></div>
            <div class="detail"><div class="detail-label">Class</div><div class="detail-value">${escapeHtml(academic.class)}${academic.section ? `-${escapeHtml(academic.section)}` : ""}</div></div>
            <div class="detail"><div class="detail-label">Date of Birth</div><div class="detail-value">${escapeHtml(formatDate(student.dob))}</div></div>
            <div class="detail"><div class="detail-label">Father's Name</div><div class="detail-value">${escapeHtml(student.fatherName || "N/A")}</div></div>
            <div class="detail"><div class="detail-label">Mother's Name</div><div class="detail-value">${escapeHtml(student.motherName || "N/A")}</div></div>
          </div>

          <div class="content">
            <table>
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Subject</th>
                  <th>Marks Obtained</th>
                  <th>Maximum Marks</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>

          <div class="summary">
            <div class="summary-card"><div class="summary-label">Subjects</div><div class="summary-value">${summary.subjectCount}</div></div>
            <div class="summary-card"><div class="summary-label">Total Marks</div><div class="summary-value">${summary.totalObtained}/${summary.totalMaximum}</div></div>
            <div class="summary-card"><div class="summary-label">Percentage</div><div class="summary-value">${summary.overallPercentage}%</div></div>
            <div class="summary-card"><div class="summary-label">Generated</div><div class="summary-value" style="font-size:16px">${escapeHtml(formatDate(result.createdAt))}</div></div>
          </div>

          <div class="footer">
            <div class="signature">Class Teacher</div>
            <div class="signature">Principal</div>
            <div class="meta">
              <div>Generated on ${escapeHtml(formatDate(new Date()))}</div>
              <div>System-issued official report card</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

export default function ReportCard({ result, student, academic }) {
  const subjects = Array.isArray(result.subjects) ? result.subjects : [];
  const totalObtained = subjects.reduce(
    (sum, subject) => sum + (getMarksValue(subject) ?? 0),
    0,
  );
  const totalMaximum = subjects.reduce(
    (sum, subject) => sum + getMaxMarksValue(subject),
    0,
  );
  const overallPercentage =
    totalMaximum > 0 ? ((totalObtained / totalMaximum) * 100).toFixed(1) : "0.0";
  const summary = {
    subjectCount: subjects.length,
    totalObtained,
    totalMaximum,
    overallPercentage,
  };

  const handleDownload = () => {
    const printableHtml = buildPrintableHtml({
      result,
      student,
      academic,
      summary,
    });
    const printWindow = window.open("", "_blank", "width=1100,height=900");

    if (!printWindow) {
      window.alert("Please allow popups to download the report card.");
      return;
    }

    printWindow.document.open();
    printWindow.document.write(printableHtml);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-xl shadow-blue-100/40">
      <div className="border-b border-blue-100 bg-gradient-to-r from-slate-50 via-white to-blue-50 px-6 py-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Tagore Public School"
              className="h-16 w-16 rounded-2xl border border-blue-100 object-cover shadow-sm"
            />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-700">
                Official Report Card
              </p>
              <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
                Tagore Public School
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Academic Session {result.academicYear}
              </p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-800"
          >
            <Download size={18} />
            Download / Print
          </button>
        </div>
      </div>

      <div className="grid gap-6 border-b border-blue-100 bg-slate-50/80 px-6 py-6 md:grid-cols-[auto,1fr]">
        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.5rem] border border-blue-100 bg-white text-3xl font-black text-blue-700 shadow-sm">
          {student?.profileImageUrl ? (
            <img
              src={student.profileImageUrl}
              alt={student.name}
              className="h-full w-full object-cover"
            />
          ) : (
            student?.name
              ?.split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0]?.toUpperCase())
              .join("")
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
              Student Name
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">{student?.name}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
              Admission No
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {student?.admissionNo}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
              Class
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {academic?.class}
              {academic?.section ? `-${academic.section}` : ""}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
              Date of Birth
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {formatDate(student?.dob)}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
              Father&apos;s Name
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {student?.fatherName || "N/A"}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
              Mother&apos;s Name
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {student?.motherName || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-6 py-6">
        {subjects.length > 0 ? (
          <SubjectMarksTable subjects={subjects} />
        ) : (
          <div className="py-8 text-center text-gray-500">
            No subject marks available for this year.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-500">
              Subjects
            </p>
            <p className="mt-2 text-3xl font-black text-blue-900">
              {summary.subjectCount}
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-500">
              Total Marks
            </p>
            <p className="mt-2 text-3xl font-black text-emerald-900">
              {summary.totalObtained}/{summary.totalMaximum}
            </p>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-amber-500">
              Percentage
            </p>
            <p className="mt-2 text-3xl font-black text-amber-900">
              {summary.overallPercentage}%
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
              Issued
            </p>
            <p className="mt-2 text-xl font-black text-slate-900">
              {formatDate(result.createdAt)}
            </p>
          </div>
        </div>

        <div className="grid gap-6 border-t border-slate-200 pt-8 md:grid-cols-[1fr,1fr,auto]">
          <div className="border-t border-slate-300 pt-3 text-center text-sm font-medium text-slate-600">
            Class Teacher
          </div>
          <div className="border-t border-slate-300 pt-3 text-center text-sm font-medium text-slate-600">
            Principal
          </div>
          <div className="flex items-start gap-2 text-xs text-slate-400">
            <FileBadge2 size={16} />
            Generated on {formatDate(new Date())}
          </div>
        </div>
      </div>
    </div>
  );
}
