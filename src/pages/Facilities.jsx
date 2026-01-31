import libraryImg from "../assets/images/facilities/library.jpg";
import computerLabImg from "../assets/images/facilities/computer-lab.jpg";
import scienceLabImg from "../assets/images/facilities/science-lab.jpg";
import mathLabImg from "../assets/images/facilities/math-lab.jpg";
import playgroundImg from "../assets/images/facilities/playground.jpg";
import smartClassImg from "../assets/images/facilities/smart-class.jpg";
import transportImg from "../assets/images/facilities/transport.jpg";

const facilities = [
  {
    title: "Library",
    description:
      "A well-stocked library that encourages reading habits and academic enrichment.",
    image: libraryImg,
  },
  {
    title: "Computer Laboratory",
    description:
      "Modern computer lab with internet access to support digital learning.",
    image: computerLabImg,
  },
  {
    title: "Science Laboratories",
    description:
      "Separate laboratories for Physics, Chemistry, and Biology with practical exposure.",
    image: scienceLabImg,
  },
  {
    title: "Mathematics Lab",
    description:
      "Hands-on learning environment to strengthen mathematical concepts.",
    image: mathLabImg,
  },
  {
    title: "Playground & Sports",
    description:
      "Spacious playground and sports facilities for physical development.",
    image: playgroundImg,
  },
  {
    title: "Smart Classrooms",
    description:
      "Technology-enabled classrooms to enhance teaching and learning.",
    image: smartClassImg,
  },
  {
    title: "Transport Facility",
    description: "Safe and reliable transport facility covering nearby areas.",
    image: transportImg,
  },
];

export default function Facilities() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-semibold mb-10">Our Facilities</h1>

      <div className="space-y-12">
        {facilities.map((item, index) => (
          <div key={index} className="grid gap-6 md:grid-cols-2 items-center">
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-cover rounded border"
            />

            {/* Text Content */}
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-blue-700">
                {item.title}
              </h2>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
