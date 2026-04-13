import { useState, useEffect } from "react";
import api from "../../lib/api";

export const DailyChallengeWidget = () => {
  const [challenge, setChallenge] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    fetchChallenge();
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    if (!challenge) return;
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(challenge.endDate);
      const diff = end - now;
      if (diff <= 0) {
        setTimeLeft("Challenge closed");
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (3600000)) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [challenge]);

  const fetchChallenge = async () => {
    try {
      const res = await api.get("/challenge/today");
      setChallenge(res.data);
    } catch (err) {
      setMessage("✨ No active challenge today. Come back tomorrow!");
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get("/challenge/leaderboard/today");
      setLeaderboard(res.data);
    } catch (err) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentName.trim() || !answerText.trim()) {
      setMessage("Please enter your name and answer");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("challengeId", challenge.id);
    formData.append("studentName", studentName);
    formData.append("answerText", answerText);
    if (imageFile) formData.append("image", imageFile);

    try {
      await api.post("/challenge/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("🎉 Submission received! Our team will review it soon.");
      setStudentName("");
      setAnswerText("");
      setImageFile(null);
    } catch (err) {
      setMessage(err.response?.data?.error || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getRankDisplay = (idx) => {
    if (idx === 0) return "🥇";
    if (idx === 1) return "🥈";
    if (idx === 2) return "🥉";
    return `${idx + 1}.`;
  };

  if (!challenge) {
    return (
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 text-center shadow-lg">
        <div className="text-6xl mb-4">🧠</div>
        <h3 className="font-henny text-2xl font-bold text-gray-800 mb-2">No Challenge Today</h3>
        <p className="font-indie text-gray-600">{message || "Check back tomorrow for a new brain teaser!"}</p>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-3xl p-6 shadow-2xl border-2 border-yellow-300">
      <div className="absolute -top-4 -left-4 text-4xl animate-bounce">🧩</div>
      <div className="absolute -bottom-4 -right-4 text-4xl animate-bounce delay-100">⭐</div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-3 shadow-sm">
          <span className="text-2xl">🏆</span>
          <span className="font-dyna text-sm font-bold uppercase tracking-wide text-orange-700">Daily Brain Teaser</span>
        </div>
        <h2 className="font-henny text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
          {challenge.title}
        </h2>
        {timeLeft && (
          <div className="mt-2 inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-dyna">
            <span className="animate-pulse">⏳</span> {timeLeft} left
          </div>
        )}
      </div>

      {challenge.imageUrl && (
        <div className="mb-6 flex justify-center">
          <img src={challenge.imageUrl} alt="Challenge" className="rounded-2xl max-h-64 object-contain shadow-md border-4 border-white" />
        </div>
      )}

      <div className="bg-white/70 rounded-2xl p-5 mb-6 shadow-inner">
        <p className="font-indie text-gray-800 text-lg md:text-xl leading-relaxed">{challenge.question}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="🌟 Your Name (will appear on leaderboard)"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="w-full px-5 py-3 rounded-xl border-2 border-yellow-200 bg-white font-indie focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
          required
        />
        <textarea
          placeholder="💡 Your Answer"
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          rows="3"
          className="w-full px-5 py-3 rounded-xl border-2 border-yellow-200 bg-white font-indie focus:outline-none focus:border-yellow-500"
          required
        />
        {challenge.allowImage && (
          <div className="border-2 border-dashed border-yellow-300 rounded-xl p-3 bg-yellow-50/50">
            <label className="font-dyna text-sm text-gray-600 flex items-center gap-2 cursor-pointer">
              📸 Upload your drawing / photo (optional)
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="hidden" />
              <span className="text-blue-600 underline">Choose file</span>
            </label>
            {imageFile && <p className="text-xs text-green-600 mt-1">✅ {imageFile.name}</p>}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-xl font-dyna font-bold text-lg shadow-md hover:shadow-xl transition-all disabled:opacity-50 transform hover:scale-[1.02] active:scale-95"
        >
          {loading ? "Submitting..." : "🚀 Submit & Win!"}
        </button>
      </form>

      {message && (
        <div className="mt-4 p-3 bg-white/80 rounded-xl text-center font-indie text-sm">{message}</div>
      )}

      <div className="mt-6 bg-blue-50 rounded-xl p-3 text-center">
        <p className="font-dyna text-xs text-blue-700">
          🎁 Points are awarded based on rank and correctness. Top 3 earn bonus points! Winners announced daily.
        </p>
      </div>

      {/* Leaderboard – shows ALL approved users */}
      {leaderboard.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl">🏆</span>
            <h3 className="font-henny text-2xl font-bold text-gray-800">Today's Top Solvers</h3>
            <span className="text-3xl">🏆</span>
          </div>
          <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
            {leaderboard.map((entry, idx) => (
              <div
                key={idx}
                className={`flex justify-between items-center p-3 rounded-xl ${
                  idx < 3 ? "bg-yellow-100 border border-yellow-300 shadow" : "bg-white/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getRankDisplay(idx)}</span>
                  <span className="font-dyna font-bold text-gray-800">
                    {entry.studentName}
                  </span>
                </div>
                <span className="font-stats font-black text-lg text-orange-600">
                  {entry.pointsAwarded} pts
                </span>
              </div>
            ))}
          </div>
          {leaderboard.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No correct answers yet. Be the first!</p>
          )}
        </div>
      )}

      <div className="mt-6 text-center text-xs text-gray-500 font-indie">
        ⏰ Challenge ends at {new Date(challenge.endDate).toLocaleTimeString()}. Submit before deadline!
      </div>
    </div>
  );
};