import principalImg from "../assets/images/principal/principal.jpg";

export default function About() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      {/* School History */}
      <div>
        <h1 className="text-3xl font-semibold mb-8 tracking-tight">
          About Our School
        </h1>
        <p className="text-gray-700 max-w-3xl">
          Tagore Public School was established with the vision of providing quality
          education that nurtures academic excellence, discipline, and strong
          moral values. Over the years, the school has grown into a trusted
          institution serving students from LKG to Class XII.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
          <p className="text-gray-700">
            To develop confident, responsible, and well-rounded individuals who
            are prepared to meet the challenges of the future.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-700">
            To provide a safe and stimulating learning environment that
            encourages academic achievement, personal growth, and social
            responsibility.
          </p>
        </div>
      </div>

      {/* Principal's Message */}
      <div className="grid gap-8 md:grid-cols-3 items-start">
        {/* Text */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Principal’s Message
          </h2>

          <p className="text-gray-700 mb-4">
            {/* existing message text */}
            At Tagore Public School, we believe that education is not just about
            acquiring knowledge, but about shaping character. Our dedicated
            faculty works closely with students to help them realize their full
            potential and become responsible citizens.
          </p>

          <p className="font-medium mt-4">— Babita Rani</p>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={principalImg}
            alt="Principal of Tagore Public School"
            className="w-48 h-60 object-cover rounded border"
          />
        </div>
      </div>
    </section>
  );
}
