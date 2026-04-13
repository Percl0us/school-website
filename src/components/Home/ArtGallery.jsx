import { useState, useEffect } from "react";
import { PenTool, Upload, Filter, Heart, Star } from "lucide-react";

export const ArtGallery = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filterGrade, setFilterGrade] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    grade: "",
    title: "",
    description: "",
    imageUrl: "",
  });
  const [likedItems, setLikedItems] = useState({});

  // Load submissions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("artGallery");
    if (stored) {
      setSubmissions(JSON.parse(stored));
    } else {
      // Demo data
      const demo = [
        {
          id: 1,
          studentName: "Aarav",
          grade: "5",
          title: "My Dream School",
          description: "A colourful drawing of a school with a big playground.",
          imageUrl: "https://picsum.photos/id/20/300/200",
          likes: 5,
          date: "2025-03-01",
          isStar: true,
        },
        {
          id: 2,
          studentName: "Diya",
          grade: "3",
          title: "Butterfly Garden",
          description: "Watercolour painting of butterflies.",
          imageUrl: "https://picsum.photos/id/15/300/200",
          likes: 8,
          date: "2025-03-05",
          isStar: false,
        },
      ];
      setSubmissions(demo);
      localStorage.setItem("artGallery", JSON.stringify(demo));
    }
    const storedLikes = localStorage.getItem("artLikes");
    if (storedLikes) setLikedItems(JSON.parse(storedLikes));
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (submissions.length) localStorage.setItem("artGallery", JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem("artLikes", JSON.stringify(likedItems));
  }, [likedItems]);

  const handleLike = (id) => {
    if (likedItems[id]) return;
    setSubmissions(prev =>
      prev.map(item =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
    setLikedItems(prev => ({ ...prev, [id]: true }));
  };

  const handleSubmitArt = (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.grade || !formData.title || !formData.imageUrl) {
      alert("Please fill all required fields (Name, Grade, Title, Image URL)");
      return;
    }
    const newArt = {
      id: Date.now(),
      ...formData,
      likes: 0,
      date: new Date().toISOString().slice(0,10),
      isStar: false,
    };
    setSubmissions(prev => [newArt, ...prev]);
    setFormData({ studentName: "", grade: "", title: "", description: "", imageUrl: "" });
    setShowForm(false);
    alert("Your artwork has been submitted! It will appear after teacher approval (demo: appears immediately).");
  };

  const filteredSubmissions = filterGrade === "all"
    ? submissions
    : submissions.filter(s => s.grade === filterGrade);

  // Determine monthly star (most likes in current month)
  const currentMonth = new Date().toISOString().slice(0,7);
  const monthlyStar = submissions
    .filter(s => s.date.startsWith(currentMonth))
    .sort((a,b) => b.likes - a.likes)[0];

  return (
    <div className="space-y-8">
      {/* Header with Star Artist */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 mb-2">
            <PenTool size={14} className="text-purple-600" />
            <span className="font-dyna text-xs font-bold uppercase text-purple-700">Creative Corner</span>
          </div>
          <h2 className="font-henny text-3xl font-bold text-gray-800">Student Art Gallery</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="font-dyna bg-purple-600 text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-purple-700 transition"
        >
          <Upload size={16} /> Submit Your Art
        </button>
      </div>

      {/* Monthly Star Artist */}
      {monthlyStar && (
        <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl p-4 flex items-center gap-4 flex-wrap">
          <div className="bg-yellow-400 text-white p-2 rounded-full">
            <Star size={24} fill="white" />
          </div>
          <div>
            <p className="font-dyna text-sm uppercase tracking-wide">⭐ Star Artist of the Month</p>
            <p className="font-henny text-xl font-bold">{monthlyStar.studentName} (Grade {monthlyStar.grade})</p>
            <p className="font-indie text-gray-700">"{monthlyStar.title}" – {monthlyStar.likes} likes</p>
          </div>
        </div>
      )}

      {/* Submission Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="font-dyna text-xl font-bold mb-4">Share Your Creation</h3>
          <form onSubmit={handleSubmitArt} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                value={formData.studentName}
                onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                className="px-4 py-2 border rounded-xl font-indie"
              />
              <select
                value={formData.grade}
                onChange={(e) => setFormData({...formData, grade: e.target.value})}
                className="px-4 py-2 border rounded-xl font-indie"
              >
                <option value="">Select Grade *</option>
                {["LKG","UKG","1","2","3","4","5","6","7","8","9","10","11","12"].map(g => (
                  <option key={g}>{g}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Title of Artwork *"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="px-4 py-2 border rounded-xl font-indie col-span-full"
              />
              <textarea
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="2"
                className="px-4 py-2 border rounded-xl font-indie col-span-full"
              />
              <input
                type="text"
                placeholder="Image URL (upload to imgur or use a link) *"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="px-4 py-2 border rounded-xl font-indie col-span-full"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 border rounded-xl">Cancel</button>
              <button type="submit" className="bg-purple-600 text-white px-5 py-2 rounded-xl">Submit</button>
            </div>
          </form>
        </div>
      )}

      {/* Filter by Grade */}
      <div className="flex items-center gap-3">
        <Filter size={18} className="text-gray-500" />
        <span className="font-dyna text-sm">Filter by grade:</span>
        <select
          value={filterGrade}
          onChange={(e) => setFilterGrade(e.target.value)}
          className="px-3 py-1 border rounded-full text-sm font-indie"
        >
          <option value="all">All Grades</option>
          {["LKG","UKG","1","2","3","4","5","6","7","8","9","10","11","12"].map(g => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubmissions.map((art) => (
          <div key={art.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100">
            <img src={art.imageUrl} alt={art.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-henny text-xl font-bold text-gray-800">{art.title}</h3>
              <p className="font-indie text-gray-600 text-sm mt-1">by {art.studentName} (Grade {art.grade})</p>
              {art.description && <p className="font-indie text-gray-500 text-sm mt-2">{art.description}</p>}
              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={() => handleLike(art.id)}
                  disabled={likedItems[art.id]}
                  className={`flex items-center gap-1 text-sm ${likedItems[art.id] ? 'text-red-500' : 'text-gray-500 hover:text-red-500'} transition`}
                >
                  <Heart size={18} fill={likedItems[art.id] ? "currentColor" : "none"} /> {art.likes}
                </button>
                {art.isStar && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">🌟 Star Artist</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredSubmissions.length === 0 && (
        <p className="text-center text-gray-500 py-8">No artworks yet. Be the first to submit!</p>
      )}
    </div>
  );
};