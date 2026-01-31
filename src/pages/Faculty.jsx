import facultyMembers from "../data/faculty";

export default function Faculty() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-semibold mb-10 tracking-tight">
        Our Faculty
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {facultyMembers.map((member, index) => (
          <div key={index} className="border rounded p-4 text-center bg-white">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 mx-auto object-cover rounded-full mb-4 border"
            />

            <h3 className="font-semibold">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.role}</p>
            <p className="text-sm text-gray-700 mt-1">{member.subject}</p>
            <p className="text-xs text-gray-500">{member.qualification}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
