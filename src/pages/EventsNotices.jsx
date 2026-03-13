import notices from "../data/notices";
import { Calendar, Bell, Info, Megaphone } from "lucide-react";

export default function EventsNotices() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <span className="text-red-600 font-bold uppercase tracking-widest text-xs">Live Updates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Events & <span className="text-blue-600">Notices</span>
          </h1>
        </div>
        <p className="text-gray-500 font-medium italic border-l-4 border-blue-600 pl-4 max-w-xs">
          Stay updated with the latest happenings at Tagore Public School.
        </p>
      </div>

      {/* Notices List */}
      <div className="space-y-6">
        {notices.map((item) => {
          const isEvent = item.type === "Event";
          
          return (
            <div
              key={item.id}
              className={`group relative flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-[2rem] border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                isEvent
                  ? "bg-white border-blue-100 hover:border-blue-300"
                  : "bg-gray-50 border-gray-100 hover:border-gray-300"
              }`}
            >
              {/* Date Chip */}
              <div className={`flex flex-col items-center justify-center min-w-[80px] h-20 rounded-2xl shadow-sm ${
                isEvent ? "bg-blue-600 text-white" : "bg-white text-gray-900 border border-gray-100"
              }`}>
                <span className="text-xs font-bold uppercase opacity-80">
                  {item.date.split(" ")[1] || "Date"}
                </span>
                <span className="text-2xl font-black leading-none">
                  {item.date.split(" ")[0]}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                    isEvent 
                      ? "bg-blue-100 text-blue-700" 
                      : "bg-orange-100 text-orange-700"
                  }`}>
                    {isEvent ? <Megaphone size={12} /> : <Bell size={12} />}
                    {item.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Action Button/Indicator */}
              <div className="hidden md:block">
                <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-500">
                  <Info className="text-gray-400 group-hover:text-white transition-colors" size={20} />
                </div>
              </div>
              
              {/* Decorative side accent */}
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/2 rounded-r-full transition-all duration-500 ${
                isEvent ? "bg-blue-600 opacity-0 group-hover:opacity-100" : "bg-gray-400 opacity-0 group-hover:opacity-100"
              }`} />
            </div>
          );
        })}
      </div>

      {/* Empty State / End of List */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full text-gray-500 text-sm font-medium">
          <Calendar size={16} />
          End of recent notices
        </div>
      </div>
    </section>
  );
}