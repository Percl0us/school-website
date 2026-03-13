import { useMemo } from "react";

export default function ClassSummaryGrid({ students }) {
  const classSummary = useMemo(() => {
    const summary = {};
    students.forEach((s) => {
      if (!summary[s.class]) {
        summary[s.class] = {
          totalStudents: 0, cleared: 0, review: 0, due: 0, collected: 0, outstanding: 0,
        };
      }
      const cls = summary[s.class];
      cls.totalStudents += 1;
      cls.collected += s.totalPaid;
      cls.outstanding += s.balance;

      if (s.computedStatus === "CLEARED") cls.cleared += 1;
      else if (s.computedStatus === "REVIEW") cls.review += 1;
      else cls.due += 1;
    });
    return summary;
  }, [students]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.entries(classSummary).map(([cls, data]) => {
        const totalPotential = data.collected + data.outstanding;
        const collectionRate = totalPotential > 0 
          ? Math.round((data.collected / totalPotential) * 100) 
          : 0;

        return (
          <div key={cls} className="bg-white p-5 rounded-xl shadow space-y-3 border border-gray-50">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-700">Class {cls}</h3>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {collectionRate}% Collected
              </span>
            </div>

            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-500" 
                style={{ width: `${collectionRate}%` }} 
              />
            </div>

            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm pt-2">
              <p className="text-gray-500">Students: <span className="text-black font-medium">{data.totalStudents}</span></p>
              <p className="text-green-600">Cleared: {data.cleared}</p>
              <p className="text-orange-600">Review: {data.review}</p>
              <p className="text-red-600">Due: {data.due}</p>
            </div>
            
            <div className="pt-2 border-t text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Collected:</span>
                <span className="font-semibold text-green-700">₹{data.collected.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Outstanding:</span>
                <span className="font-semibold text-red-700">₹{data.outstanding.toLocaleString()}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}