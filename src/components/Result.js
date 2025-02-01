import React from "react";

const Result = ({ score, totalQuestions, onRestart }) => {
  const getBadge = () => {
    if (score >= totalQuestions * 10) return "Quiz Master";
    if (score >= totalQuestions * 7) return "Quiz Pro";
    return "Quiz Novice";
  };

  return (
    <div className="bg-white p-8 rounded shadow-md max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
      <p className="mb-2 text-lg">
        Your final score: <span className="font-semibold">{score}</span>
      </p>
      <p className="mb-6 text-lg">
        You earned the badge: <span className="font-semibold">{getBadge()}</span>
      </p>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        onClick={onRestart}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Result;
