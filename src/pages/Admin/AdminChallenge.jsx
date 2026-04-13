import { useState, useEffect } from "react";
import api from "../../lib/api";

export default function AdminChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Form state for creating a new challenge
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    question: "",
    answerHint: "",
    allowImage: false,
    startDate: "",
    endDate: "",
  });
  const [challengeImage, setChallengeImage] = useState(null);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const res = await api.get("/challenge/admin/challenges");
      setChallenges(res.data);
    } catch (err) {
      console.error("Failed to fetch challenges", err);
    }
  };

  const fetchSubmissions = async (challengeId) => {
    try {
      const res = await api.get(`/challenge/admin/challenges/${challengeId}/submissions`);
      setSubmissions(res.data);
    } catch (err) {
      console.error("Failed to fetch submissions", err);
    }
  };

  const handleCreateChallenge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", newChallenge.title);
    formData.append("question", newChallenge.question);
    formData.append("answerHint", newChallenge.answerHint);
    formData.append("allowImage", newChallenge.allowImage);
    formData.append("startDate", newChallenge.startDate);
    formData.append("endDate", newChallenge.endDate);
    if (challengeImage) formData.append("challengeImage", challengeImage);

    try {
      await api.post("/challenge/admin/challenges", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Challenge created successfully!");
      setNewChallenge({
        title: "",
        question: "",
        answerHint: "",
        allowImage: false,
        startDate: "",
        endDate: "",
      });
      setChallengeImage(null);
      fetchChallenges();
    } catch (err) {
      setMessage("❌ Failed to create challenge");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (submissionId, rank, points) => {
    try {
      await api.put(`/challenge/admin/submissions/${submissionId}`, {
        status: "APPROVED",
        pointsAwarded: parseInt(points),
        rank: parseInt(rank),
      });
      fetchSubmissions(selectedChallenge.id);
      setMessage("✅ Submission approved");
    } catch (err) {
      setMessage("❌ Failed to approve");
    }
  };

  const handleReject = async (submissionId) => {
    try {
      await api.put(`/challenge/admin/submissions/${submissionId}`, {
        status: "REJECTED",
      });
      fetchSubmissions(selectedChallenge.id);
      setMessage("❌ Submission rejected");
    } catch (err) {
      setMessage("❌ Failed to reject");
    }
  };

  const handleSelectChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    fetchSubmissions(challenge.id);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="font-henny text-3xl font-bold mb-6">📅 Daily Challenges</h1>

      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded-xl">{message}</div>
      )}

      {/* Create New Challenge */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="font-dyna text-xl font-bold mb-4">Create New Challenge</h2>
        <form onSubmit={handleCreateChallenge} className="space-y-4">
          <input
            type="text"
            placeholder="Title *"
            value={newChallenge.title}
            onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            placeholder="Question *"
            value={newChallenge.question}
            onChange={(e) => setNewChallenge({ ...newChallenge, question: e.target.value })}
            className="w-full border p-2 rounded"
            rows="3"
            required
          />
          <input
            type="text"
            placeholder="Answer Hint (admin only, not shown to students)"
            value={newChallenge.answerHint}
            onChange={(e) => setNewChallenge({ ...newChallenge, answerHint: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newChallenge.allowImage}
              onChange={(e) => setNewChallenge({ ...newChallenge, allowImage: e.target.checked })}
            />
            Allow students to upload an image with their answer
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date & Time *</label>
              <input
                type="datetime-local"
                value={newChallenge.startDate}
                onChange={(e) => setNewChallenge({ ...newChallenge, startDate: e.target.value })}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date & Time *</label>
              <input
                type="datetime-local"
                value={newChallenge.endDate}
                onChange={(e) => setNewChallenge({ ...newChallenge, endDate: e.target.value })}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Challenge Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setChallengeImage(e.target.files[0])}
              className="w-full border p-2 rounded"
            />
            {challengeImage && (
              <p className="text-sm text-green-600 mt-1">Selected: {challengeImage.name}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-dyna hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Challenge"}
          </button>
        </form>
      </div>

      {/* List of existing challenges */}
      <div className="mb-8">
        <h2 className="font-dyna text-xl font-bold mb-4">Existing Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((ch) => (
            <div
              key={ch.id}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                selectedChallenge?.id === ch.id
                  ? "bg-blue-50 border-blue-400 shadow"
                  : "bg-white border-gray-200 hover:shadow"
              }`}
              onClick={() => handleSelectChallenge(ch)}
            >
              <h3 className="font-bold text-lg">{ch.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(ch.startDate).toLocaleString()} → {new Date(ch.endDate).toLocaleString()}
              </p>
              {ch.imageUrl && (
                <img src={ch.imageUrl} alt="Challenge" className="mt-2 h-20 object-cover rounded" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pending submissions for selected challenge */}
      {selectedChallenge && (
        <div>
          <h2 className="font-dyna text-xl font-bold mb-4">
            Pending Submissions for "{selectedChallenge.title}"
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Submissions are ordered by submission time (oldest first). Suggested rank is auto‑filled based on order.
          </p>
          {submissions.length === 0 ? (
            <p className="text-gray-500">No pending submissions.</p>
          ) : (
            <div className="space-y-4">
              {submissions.map((sub, idx) => (
                <div key={sub.id} className="bg-white p-4 rounded-xl shadow border">
                  <p><strong>Name:</strong> {sub.studentName}</p>
                  <p><strong>Submitted at:</strong> {new Date(sub.createdAt).toLocaleString()}</p>
                  <p><strong>Answer:</strong> {sub.answerText}</p>
                  {sub.imageUrl && (
                    <div className="mt-2">
                      <img src={sub.imageUrl} alt="Submission" className="max-h-48 rounded border" />
                    </div>
                  )}
                  <div className="flex gap-3 mt-3 items-center flex-wrap">
                    <input
                      type="number"
                      placeholder="Rank"
                      defaultValue={idx + 1}
                      className="border p-1 w-24 rounded"
                      id={`rank-${sub.id}`}
                    />
                    <input
                      type="number"
                      placeholder="Points"
                      className="border p-1 w-24 rounded"
                      id={`points-${sub.id}`}
                    />
                    <button
                      onClick={() =>
                        handleApprove(
                          sub.id,
                          document.getElementById(`rank-${sub.id}`).value,
                          document.getElementById(`points-${sub.id}`).value
                        )
                      }
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(sub.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}