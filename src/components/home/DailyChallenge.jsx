import { useState, useEffect } from "react";
import { Lightbulb } from "lucide-react";

const challenges = [
  {
    type: "math",
    question: "What is 15 + 27?",
    answer: "42",
    hint: "Add the two numbers.",
  },
  {
    type: "riddle",
    question: "I have keys but no locks. I have space but no room. What am I?",
    answer: "keyboard",
    hint: "You type on me.",
  },
  {
    type: "word",
    question: "What is a 5-letter word that means 'very clever'?",
    answer: "smart",
    hint: "Synonym of intelligent.",
  },
  {
    type: "math",
    question: "If a dozen eggs cost ₹60, how much does one egg cost?",
    answer: "5",
    hint: "Divide by 12.",
  },
  {
    type: "riddle",
    question: "What has to be broken before you can use it?",
    answer: "egg",
    hint: "Breakfast item.",
  },
];

export const DailyChallenge = () => {
  const [challenge, setChallenge] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [rewardShown, setRewardShown] = useState(false);

  useEffect(() => {
    // Use date to pick a consistent challenge for the day
    const dayIndex = new Date().getDate() % challenges.length;
    setChallenge(challenges[dayIndex]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!challenge) return;
    const isCorrect = userAnswer.trim().toLowerCase() === challenge.answer.toLowerCase();
    if (isCorrect) {
      setFeedback("✅ Correct! Great job! 🎉");
      if (!rewardShown) {
        // Optional: play a cheer sound or show confetti
        setRewardShown(true);
      }
      setRevealed(true);
    } else {
      setFeedback("❌ Not quite. Try again! Use the hint if needed.");
    }
  };

  const showHint = () => {
    if (challenge) setFeedback(`💡 Hint: ${challenge.hint}`);
  };

  const nextChallenge = () => {
    // For demo – pick a different challenge (in real life, you'd wait for next day)
    setUserAnswer("");
    setFeedback("");
    setRevealed(false);
    setRewardShown(false);
    const newIndex = (new Date().getDate() + 1) % challenges.length;
    setChallenge(challenges[newIndex]);
  };

  if (!challenge) return <div className="text-center py-8">Loading challenge...</div>;

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 shadow-lg border border-yellow-200">
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb className="text-yellow-600" size={28} />
        <h3 className="font-henny text-2xl font-bold text-gray-800">Daily Brain Teaser</h3>
      </div>
      <p className="font-indie text-gray-700 text-lg mb-4">{challenge.question}</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer..."
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 font-indie focus:outline-none focus:ring-2 focus:ring-yellow-400"
          disabled={revealed}
        />
        <button
          type="submit"
          disabled={revealed}
          className="font-dyna bg-yellow-600 text-white px-6 py-2 rounded-xl hover:bg-yellow-700 transition disabled:opacity-50"
        >
          Check
        </button>
        <button
          type="button"
          onClick={showHint}
          className="font-dyna bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300 transition"
        >
          Hint
        </button>
      </form>
      {feedback && <p className="mt-3 font-indie text-sm">{feedback}</p>}
      {revealed && (
        <button
          onClick={nextChallenge}
          className="mt-4 text-sm font-dyna text-blue-600 underline"
        >
          Try tomorrow's challenge →
        </button>
      )}
    </div>
  );
};