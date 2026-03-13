import libraryImg from "../assets/images/facilities/library.jpg";
import computerLabImg from "../assets/images/facilities/computer-lab.jpg";
import scienceLabImg from "../assets/images/facilities/science-lab.jpg";
import mathLabImg from "../assets/images/facilities/math-lab.jpg";
import playgroundImg from "../assets/images/facilities/playground.jpg";
import transportImg from "../assets/images/facilities/transport.jpg";

const facilities = [
  {
    title: "Library",
    description: "A well-stocked library that encourages reading habits and academic enrichment.",
    image: libraryImg,
  },
  {
    title: "Computer Laboratory",
    description: "Modern computer lab with internet access to support digital learning.",
    image: computerLabImg,
  },
  {
    title: "Science Laboratories",
    description: "Separate laboratories for Physics, Chemistry, and Biology with practical exposure.",
    image: scienceLabImg,
  },
  {
    title: "Mathematics Lab",
    description: "Hands-on learning environment to strengthen mathematical concepts.",
    image: mathLabImg,
  },
  {
    title: "Playground & Sports",
    description: "Spacious playground and sports facilities for physical development.",
    image: playgroundImg,
  },
  {
    title: "Transport Facility",
    description: "Safe and reliable transport facility covering nearby areas.",
    image: transportImg,
  },
];

export default function Facilities() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Facilities</h1>
        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-20">
        {facilities.map((item, index) => (
          <div 
            key={index} 
            className={`flex flex-col md:items-center gap-8 lg:gap-16 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Image Container */}
            <div className="w-full md:w-1/2">
              <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100 transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-64 lg:h-80 w-full object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 space-y-4">
              <h2 className="text-3xl font-bold text-blue-700">
                {item.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {item.description}
              </p>
              <div className="pt-2">
                <span className="inline-block h-1 w-12 bg-blue-200 rounded"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}