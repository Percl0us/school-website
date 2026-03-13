import { useEffect, useState, useMemo, useCallback } from "react";
import api from "../../../lib/api";
import { useAdminAuth } from "../../../context/AdminAuthContext";

// Sub-components
import GlobalSummary from "./components/GlobalSummary";
import ClassSummaryGrid from "./components/ClassSummaryGrid";
import FilterBar from "./components/FilterBar";
import StudentTable from "./components/StudentTable";
import DiscountModal from "./components/DiscountModal";

const getStudentStatus = (s) => {
  if (s.balance === 0) return "CLEARED";
  if (s.pendingCount > 0) return "REVIEW";
  return "DUE";
};

export default function OverviewTab() {
  const { academicYear } = useAdminAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [applyingDiscount, setApplyingDiscount] = useState(false);

  // Filter States
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("NAME");

  const fetchOverview = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/admin/finance/overview?academicYear=${academicYear}`,
      );
      const enriched = res.data.map((s) => ({
        ...s,
        computedStatus: getStudentStatus(s),
      }));
      setStudents(enriched);
    } catch (err) {
      console.error("Overview fetch failed", err);
    } finally {
      setLoading(false);
    }
  }, [academicYear]);

  useEffect(() => {
    if (academicYear) fetchOverview();
  }, [fetchOverview]);

  const handleUpdateDiscount = async (amount, isRemoval = false) => {
    try {
      setApplyingDiscount(true);
      await api.post("/admin/students/discount", {
        admissionNo: selectedStudent.admissionNo,
        academicYear,
        amount: isRemoval ? 0 : amount,
      });
      await fetchOverview();
      setSelectedStudent(null);
    } catch (err) {
      alert(err.response?.data?.error || "Operation failed");
    } finally {
      setApplyingDiscount(false);
    }
  };

  // Data Derivation (Memos)
  const globalStats = useMemo(() => {
    return students.reduce(
      (acc, s) => {
        acc.totalStudents += 1;
        acc.totalCollected += s.totalPaid;
        acc.totalOutstanding += s.balance;
        acc[s.computedStatus.toLowerCase()] =
          (acc[s.computedStatus.toLowerCase()] || 0) + 1;
        return acc;
      },
      {
        totalStudents: 0,
        totalCollected: 0,
        totalOutstanding: 0,
        cleared: 0,
        review: 0,
        due: 0,
      },
    );
  }, [students]);

  const classes = useMemo(
    () => [...new Set(students.map((s) => s.class))].sort(),
    [students],
  );

  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        const searchTerm = search.trim().toLowerCase();

        const matchesSearch =
          s.name.toLowerCase().includes(searchTerm) ||
          s.admissionNo.toLowerCase().includes(searchTerm);
        const matchesClass = classFilter === "ALL" || s.class === classFilter;
        const matchesStatus =
          statusFilter === "ALL" || s.computedStatus === statusFilter;
        return matchesSearch && matchesClass && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "NAME") return a.name.localeCompare(b.name);
        if (sortBy === "BALANCE") return b.balance - a.balance;
        if (sortBy === "PAID") return b.totalPaid - a.totalPaid;
        return 0;
      });
  }, [students, search, classFilter, statusFilter, sortBy]);

  if (loading)
    return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="space-y-8">
      <GlobalSummary stats={globalStats} />

      <ClassSummaryGrid students={students} />

      <FilterBar
        search={search}
        setSearch={setSearch}
        classFilter={classFilter}
        setClassFilter={setClassFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        classes={classes}
      />

      <StudentTable
        students={filteredStudents}
        onManage={(s) => setSelectedStudent(s)}
      />

      {selectedStudent && (
        <DiscountModal
          student={selectedStudent}
          isApplying={applyingDiscount}
          onClose={() => setSelectedStudent(null)}
          onUpdate={handleUpdateDiscount}
        />
      )}
    </div>
  );
}
