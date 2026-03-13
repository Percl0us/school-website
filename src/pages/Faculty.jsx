import { Mail, GraduationCap, Award } from "lucide-react"; // Matching your previous icon style
import facultyMembers from "../data/faculty";

export default function Faculty() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Section Header */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-1.5 bg-blue-600 rounded-full" />
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Mentors</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
          Meet Our Expert <span className="text-blue-600">Faculty</span>
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl text-lg">
          Our educators are dedicated professionals committed to shaping the leaders of tomorrow 
          through innovative teaching and personal mentorship.
        </p>
      </div>

      {/* Faculty Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {facultyMembers.map((member, index) => (
          <div 
            key={index} 
            className="group relative bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            {/* Background Accent Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Profile Image with Ring Effect */}
            <div className="relative z-10 mb-6">
              <div className="w-32 h-32 mx-auto relative">
                <div className="absolute inset-0 rounded-full border-2 border-blue-600/10 group-hover:border-blue-600 transition-colors duration-500 scale-110" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full shadow-md grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center space-y-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                {member.name}
              </h3>
              
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg uppercase tracking-wide">
                {member.role}
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <BookOpen size={14} className="text-blue-500" />
                  <span className="text-sm font-medium italic">{member.subject}</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <GraduationCap size={14} />
                  <span className="text-xs">{member.qualification}</span>
                </div>
              </div>

              {/* Decorative Social/Contact placeholders to fill space nicely */}
              <div className="pt-6 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <button className="p-2 bg-gray-50 hover:bg-blue-600 hover:text-white rounded-full transition-colors">
                  <Mail size={16} />
                </button>
                <button className="p-2 bg-gray-50 hover:bg-blue-600 hover:text-white rounded-full transition-colors">
                  <Award size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Small helper for the icon used above
function BookOpen({ size, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}