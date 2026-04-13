import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { RevealOnScroll } from "../shared/RevealOnScroll";
import announcements from "../../data/announcements";

export const AnnouncementsBar = () => {
  return (
    <section className="relative z-20 mx-auto max-w-6xl px-4 -mt-12 sm:-mt-16 sm:px-6">
      <RevealOnScroll>
        <div className="rounded-2xl border border-blue-100 bg-white/80 backdrop-blur-sm p-5 transition-all hover:shadow-md sm:rounded-3xl sm:p-8">
          <div className="mb-6 flex items-center justify-between sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-6 w-1.5 animate-pulse rounded-full bg-gradient-to-b from-red-500 to-orange-500 sm:h-8 sm:w-2" />
              <h2 className="font-dyna text-xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent sm:text-2xl pb-1">
                Notice Board
              </h2>
            </div>
            <Link
              to="/events"
              className="font-glory group flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-blue-600 transition hover:text-purple-600 sm:text-sm"
            >
              View All{" "}
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {announcements.slice(0, 3).map((item, idx) => (
              <div
                key={item.id}
                className="group rounded-xl border border-gray-100 bg-white p-4 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-sm sm:rounded-2xl sm:p-5"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <span className="font-da inline-block rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-700">
                  {item.date}
                </span>
                <p className="font-indie mt-2 line-clamp-2 text-base font-bold text-gray-800 group-hover:text-blue-700 sm:text-lg md:text-xl leading-snug pb-1">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};