import { useEffect, useState } from "react";
import { useToast } from "../../components/ui/ToastProvider";
import api from "../../lib/api";

const emptyChallenge = {
  title: "",
  question: "",
  answerHint: "",
  allowImage: false,
  startDate: "",
  endDate: "",
};

const toDateTimeLocalValue = (value) => {
  if (!value) return "";

  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16);
};

export default function AdminChallengeManager() {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [challengeForm, setChallengeForm] = useState(emptyChallenge);
  const [challengeImage, setChallengeImage] = useState(null);
  const [removeExistingImage, setRemoveExistingImage] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchChallenges();
  }, []);

  const resetForm = () => {
    setFormMode("create");
    setChallengeForm(emptyChallenge);
    setChallengeImage(null);
    setRemoveExistingImage(false);
  };

  const fetchChallenges = async () => {
    try {
      const res = await api.get("/challenge/admin/challenges");
      setChallenges(res.data);

      if (selectedChallenge) {
        const freshSelected = res.data.find((challenge) => challenge.id === selectedChallenge.id);
        if (freshSelected) {
          setSelectedChallenge(freshSelected);
        } else {
          setSelectedChallenge(null);
          setSubmissions([]);
          resetForm();
        }
      }
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

  const populateFormForEdit = (challenge) => {
    setFormMode("edit");
    setChallengeForm({
      title: challenge.title || "",
      question: challenge.question || "",
      answerHint: challenge.answerHint || "",
      allowImage: Boolean(challenge.allowImage),
      startDate: toDateTimeLocalValue(challenge.startDate),
      endDate: toDateTimeLocalValue(challenge.endDate),
    });
    setChallengeImage(null);
    setRemoveExistingImage(false);
  };

  const handleSelectChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    populateFormForEdit(challenge);
    fetchSubmissions(challenge.id);
  };

  const buildChallengeFormData = () => {
    const formData = new FormData();
    formData.append("title", challengeForm.title);
    formData.append("question", challengeForm.question);
    formData.append("answerHint", challengeForm.answerHint);
    formData.append("allowImage", challengeForm.allowImage);
    formData.append("startDate", challengeForm.startDate);
    formData.append("endDate", challengeForm.endDate);

    if (challengeImage) {
      formData.append("challengeImage", challengeImage);
    }

    if (formMode === "edit") {
      formData.append("removeImage", removeExistingImage);
    }

    return formData;
  };

  const handleSubmitChallenge = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = buildChallengeFormData();

      if (formMode === "edit" && selectedChallenge) {
        const res = await api.put(
          `/challenge/admin/challenges/${selectedChallenge.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );

        setSelectedChallenge(res.data);
        await fetchSubmissions(res.data.id);
        toast.success("Challenge updated successfully.");
      } else {
        await api.post("/challenge/admin/challenges", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        resetForm();
        toast.success("Challenge created successfully.");
      }

      await fetchChallenges();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to save challenge.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChallenge = async (challenge) => {
    const confirmed = window.confirm(
      `Delete "${challenge.title}"? This will also remove all submissions for this challenge.`,
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      await api.delete(`/challenge/admin/challenges/${challenge.id}`);

      if (selectedChallenge?.id === challenge.id) {
        setSelectedChallenge(null);
        setSubmissions([]);
        resetForm();
      }

      await fetchChallenges();
      toast.success("Challenge deleted successfully.");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete challenge.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (submissionId, rank, points) => {
    try {
      await api.put(`/challenge/admin/submissions/${submissionId}`, {
        status: "APPROVED",
        pointsAwarded: parseInt(points, 10) || 0,
        rank: parseInt(rank, 10) || null,
      });
      fetchSubmissions(selectedChallenge.id);
      toast.success("Submission approved.");
    } catch (err) {
      toast.error("Failed to approve submission.");
    }
  };

  const handleReject = async (submissionId) => {
    try {
      await api.put(`/challenge/admin/submissions/${submissionId}`, {
        status: "REJECTED",
      });
      fetchSubmissions(selectedChallenge.id);
      toast.info("Submission rejected.");
    } catch (err) {
      toast.error("Failed to reject submission.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="mb-6 font-henny text-3xl font-bold">Daily Challenges</h1>

      <div className="mb-8 rounded-2xl bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-dyna text-xl font-bold">
            {formMode === "edit" ? "Edit Challenge" : "Create New Challenge"}
          </h2>
          {formMode === "edit" && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Switch To Create
            </button>
          )}
        </div>

        <form onSubmit={handleSubmitChallenge} className="space-y-4">
          <input
            type="text"
            placeholder="Title *"
            value={challengeForm.title}
            onChange={(e) => setChallengeForm({ ...challengeForm, title: e.target.value })}
            className="w-full rounded border p-2"
            required
          />
          <textarea
            placeholder="Question *"
            value={challengeForm.question}
            onChange={(e) => setChallengeForm({ ...challengeForm, question: e.target.value })}
            className="w-full rounded border p-2"
            rows="3"
            required
          />
          <input
            type="text"
            placeholder="Answer Hint (admin only, not shown to students)"
            value={challengeForm.answerHint}
            onChange={(e) => setChallengeForm({ ...challengeForm, answerHint: e.target.value })}
            className="w-full rounded border p-2"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={challengeForm.allowImage}
              onChange={(e) =>
                setChallengeForm({ ...challengeForm, allowImage: e.target.checked })
              }
            />
            Allow students to upload an image with their answer
          </label>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Start Date & Time *</label>
              <input
                type="datetime-local"
                value={challengeForm.startDate}
                onChange={(e) => setChallengeForm({ ...challengeForm, startDate: e.target.value })}
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">End Date & Time *</label>
              <input
                type="datetime-local"
                value={challengeForm.endDate}
                onChange={(e) => setChallengeForm({ ...challengeForm, endDate: e.target.value })}
                className="w-full rounded border p-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Challenge Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setChallengeImage(e.target.files?.[0] || null)}
              className="w-full rounded border p-2"
            />
            {challengeImage && (
              <p className="mt-1 text-sm text-green-600">Selected: {challengeImage.name}</p>
            )}
            {formMode === "edit" && selectedChallenge?.imageUrl && !challengeImage && (
              <div className="mt-3 space-y-2">
                <img
                  src={selectedChallenge.imageUrl}
                  alt={selectedChallenge.title}
                  className="h-24 rounded border object-cover"
                />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={removeExistingImage}
                    onChange={(e) => setRemoveExistingImage(e.target.checked)}
                  />
                  Remove current image
                </label>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 px-6 py-2 font-dyna text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? formMode === "edit"
                ? "Saving..."
                : "Creating..."
              : formMode === "edit"
                ? "Save Changes"
                : "Create Challenge"}
          </button>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 font-dyna text-xl font-bold">Existing Challenges</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`rounded-xl border p-4 transition ${
                selectedChallenge?.id === challenge.id
                  ? "border-blue-400 bg-blue-50 shadow"
                  : "border-gray-200 bg-white hover:shadow"
              }`}
            >
              <button
                type="button"
                className="w-full text-left"
                onClick={() => handleSelectChallenge(challenge)}
              >
                <h3 className="text-lg font-bold">{challenge.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(challenge.startDate).toLocaleString()} to{" "}
                  {new Date(challenge.endDate).toLocaleString()}
                </p>
                {challenge.imageUrl && (
                  <img
                    src={challenge.imageUrl}
                    alt={challenge.title}
                    className="mt-2 h-20 rounded object-cover"
                  />
                )}
              </button>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectChallenge(challenge)}
                  className="rounded-lg bg-amber-500 px-3 py-1 text-white hover:bg-amber-600"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteChallenge(challenge)}
                  className="rounded-lg bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedChallenge && (
        <div>
          <h2 className="mb-4 font-dyna text-xl font-bold">
            Pending Submissions for "{selectedChallenge.title}"
          </h2>
          <p className="mb-3 text-sm text-gray-500">
            Submissions are ordered by submission time, so the suggested rank fills from oldest to newest.
          </p>
          {submissions.length === 0 ? (
            <p className="text-gray-500">No pending submissions.</p>
          ) : (
            <div className="space-y-4">
              {submissions.map((sub, idx) => (
                <div key={sub.id} className="rounded-xl border bg-white p-4 shadow">
                  <p><strong>Name:</strong> {sub.studentName}</p>
                  <p><strong>Submitted at:</strong> {new Date(sub.createdAt).toLocaleString()}</p>
                  <p><strong>Answer:</strong> {sub.answerText}</p>
                  {sub.imageUrl && (
                    <div className="mt-2">
                      <img src={sub.imageUrl} alt="Submission" className="max-h-48 rounded border" />
                    </div>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <input
                      type="number"
                      placeholder="Rank"
                      defaultValue={idx + 1}
                      className="w-24 rounded border p-1"
                      id={`rank-${sub.id}`}
                    />
                    <input
                      type="number"
                      placeholder="Points"
                      className="w-24 rounded border p-1"
                      id={`points-${sub.id}`}
                    />
                    <button
                      onClick={() =>
                        handleApprove(
                          sub.id,
                          document.getElementById(`rank-${sub.id}`).value,
                          document.getElementById(`points-${sub.id}`).value,
                        )
                      }
                      className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(sub.id)}
                      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
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
