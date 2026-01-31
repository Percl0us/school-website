import notices from "../data/notices"

export default function EventsNotices() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">

      <h1 className="text-3xl font-semibold mb-8">
        Events & Notices
      </h1>

      <div className="space-y-4">
        {notices.map((item) => (
          <div
            key={item.id}
            className={`border rounded p-4 flex justify-between items-center ${
              item.type === "Event"
                ? "bg-blue-50 border-blue-200"
                : "bg-gray-50"
            }`}
          >
            <div>
              <h3 className="font-medium">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">
                {item.type}
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {item.date}
            </span>
          </div>
        ))}
      </div>

    </section>
  )
}
