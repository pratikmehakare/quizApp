import React, { useState, useEffect } from "react";
import axios from "axios";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import "./index.css";
const apiUrl = '/api/proxy';

function App() {
  const [quizData, setQuizData] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        //for vercel deployment
        const response = await axios.get(apiUrl);
        //for local development
        //const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
        console.log("api",process.env.REACT_APP_API_URL)
        setQuizData(response.data);
      } catch (err) {
        setError("Failed to load quiz data. Please try again later.");
      }
    };
    fetchQuizData();
  }, []);

  const handleQuizComplete = (finalScore) => {
    setScore(finalScore);
    setQuizCompleted(true);
  };

  const restartQuiz = () => {
    setScore(0);
    setQuizCompleted(false);
    setQuizStarted(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-800 text-white py-6 shadow">
        <h1 className="text-3xl font-bold text-center">Quiz App</h1>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        {!quizStarted && !quizCompleted && !error && quizData && (
          <div className="bg-white p-8 rounded shadow-md max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">{quizData.title}</h2>
            <h1 className="text-xl mb-4">{quizData.topic}</h1>
            {quizData.description && <p className="mb-6">{quizData.description}</p>}
            <div className="bg-gray-100 p-4 rounded mb-6 text-left">
              <h3 className="text-xl font-bold mb-2">Instructions</h3>
              <ul className="list-disc pl-6">
                <li><strong>Correct Answer:</strong> {quizData.correct_answer_marks || "4"} points.</li>
                <li><strong>Negative Marking:</strong> {quizData.negative_marks || "1"} point.</li>
                <li><strong>Test Duration: </strong> {quizData.duration || "N/A"} min.</li>
                <li>Attempt all questions if possible.</li>
                <li>You can restart the quiz anytime after completion.</li>
              </ul>
            </div>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => setQuizStarted(true)}
            >
              Start Quiz
            </button>
          </div>
        )}
        {quizStarted && !quizCompleted && quizData && (
          <Quiz quizData={quizData} onComplete={handleQuizComplete} />
        )}
        {quizCompleted && quizData && (
          <Result score={score} totalQuestions={quizData.questions?.length || 0} onRestart={restartQuiz} />
        )}
      </main>
      <footer className="bg-gray-800 text-gray-200 text-center py-4">
        <p>&copy; 2025 Gamified Quiz App</p>
      </footer>
    </div>
  );
}

export default App;
