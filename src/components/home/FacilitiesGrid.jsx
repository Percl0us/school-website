import { Building2, Library, Computer, FlaskConical, Calculator, Trophy, MonitorSmartphone, Bus } from "lucide-react";
import { RevealOnScroll } from "../shared/RevealOnScroll";
import facilities from "../../data/facilities";

export const FacilitiesGrid = () => {
  const getIcon = (name) => {
    if (name.includes("Library")) return <Library size={24} />;
    if (name.includes("Computer")) return <Computer size={24} />;
    if (name.includes("Science")) return <FlaskConical size={24} />;
    if (name.includes("Mathematics")) return <Calculator size={24} />;
    if (name.includes("Playground") || name.includes("Sports")) return <Trophy size={24} />;
    if (name.includes("Smart Classrooms")) return <MonitorSmartphone size={24} />;
    if (name.includes("Transport")) return <Bus size={24} />;
    return <Building2 size={24} />;
  };

  const gradients = [
    "from-red-400 to-orange-400",
    "from-green-400 to-emerald-400",
    "from-blue-400 to-cyan-400",
    "from-purple-400 to-pink-400",
    "from-yellow-400 to-amber-400",
    "from-indigo-400 to-violet-400",
  ];

  return (
    <section className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <RevealOnScroll>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 mb-4">
            <Building2 size={14} className="text-blue-600" />
            <span className="font-dyna text-xs font-bold uppercase tracking-wider text-blue-700 sm:text-sm">
              Modern Infrastructure
            </span>
          </div>
          <h2 className="font-unifraktur mb-12 text-2xl font-bold leading-[1.3] pb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent sm:mb-20 sm:text-3xl md:text-4xl lg:text-5xl">
            Campus Facilities
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {facilities.map((item, index) => (
            <RevealOnScroll key={index} delay={`${(index % 4) * 100}ms`}>
              <div className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-3 hover:shadow-md sm:gap-4 sm:rounded-3xl sm:p-6 md:p-8">
                <div className={`rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} p-3 text-white shadow-md transition-all group-hover:rotate-12 group-hover:scale-110 sm:rounded-2xl sm:p-4`}>
                  {getIcon(item)}
                </div>
                <span className="font-dyna text-sm font-extrabold text-gray-800 group-hover:text-blue-700 sm:text-base md:text-lg pb-1">
                  {item}
                </span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};