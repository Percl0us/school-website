import principalImg from "../assets/images/principal/principal.jpg";

export default function About() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 space-y-24">
      
      {/* School History / Hero Section */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 tracking-tight">
          About <span className="text-blue-700">Tagore Public School</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed italic">
          "Nurturing academic excellence, discipline, and strong moral values since inception."
        </p>
        <div className="mt-8 text-lg text-gray-700 leading-loose">
          Tagore Public School was established with a clear vision: to provide quality
          education that transcends textbooks. Over the years, we have evolved into a 
          trusted institution, proudly serving our community from LKG through Class XII 
          with unwavering dedication.
        </div>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid gap-10 md:grid-cols-2">
        <div className="bg-blue-50 p-10 rounded-3xl border border-blue-100 shadow-sm transition-hover hover:shadow-md">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Drawing eye icon path..." />
              <circle cx="12" cy="12" r="3" />
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To develop confident, responsible, and well-rounded individuals who
            are prepared to meet the dynamic challenges of the global future.
          </p>
        </div>

        <div className="bg-gray-50 p-10 rounded-3xl border border-gray-200 shadow-sm transition-hover hover:shadow-md">
          <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-6 text-white">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To provide a safe, stimulating, and inclusive learning environment that
            ignites academic achievement, personal growth, and social responsibility.
          </p>
        </div>
      </div>

      {/* Principal's Message Section */}
      <div className="relative bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-3 items-stretch">
          
          {/* Principal Image */}
          <div className="relative h-80 md:h-auto overflow-hidden">
            <img
              src={principalImg}
              alt="Babita Rani - Principal"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent md:hidden"></div>
          </div>

          {/* Message Content */}
          <div className="md:col-span-2 p-10 lg:p-16 flex flex-col justify-center">
            <div className="mb-6">
               <span className="text-6xl text-blue-200 font-serif leading-none">“</span>
               <h2 className="text-3xl font-bold text-gray-900 mt-[-2rem]">Principal’s Message</h2>
            </div>

            <p className="text-lg text-gray-700 leading-loose mb-8">
              At Tagore Public School, we believe that education is not just about
              acquiring knowledge, but about shaping character. Our dedicated
              faculty works closely with students to help them realize their full
              potential and become responsible citizens of tomorrow.
            </p>

            <div>
              <p className="text-xl font-bold text-blue-700">Babita Rani</p>
              <p className="text-gray-500 font-medium">Principal, Tagore Public School</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}