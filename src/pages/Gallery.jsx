import img1 from "../assets/images/gallery/event1.jpg";
import img2 from "../assets/images/gallery/event2.jpg";
import img3 from "../assets/images/gallery/event3.jpg";
import img4 from "../assets/images/gallery/event4.jpg";
const images = [img1, img2, img3, img4];

export default function Gallery() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-semibold mb-6">Photo Gallery</h1>

      <p className="text-gray-700 max-w-3xl mb-10">
        A glimpse of academic, cultural, and sports activities conducted at ABC
        Public School throughout the year.
      </p>

      {/* Gallery Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Image Placeholder */}
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`School activity ${index + 1}`}
            className="h-40 w-full object-cover rounded border"
          />
        ))}
      </div>
    </section>
  );
}
