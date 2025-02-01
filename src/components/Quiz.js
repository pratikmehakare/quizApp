import React, { useState, useEffect } from "react";
import Question from "./Question";

const Quiz = ({ quizData, onComplete }) => {
  const questions = quizData.questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timer, setTimer] = useState(quizData.duration * 60);

  const handleAnswer = (isCorrect) => {
    let pointsEarned = 0;
    if (isCorrect) {
      const basePoints = parseFloat(quizData.correct_answer_marks) || 4;
      pointsEarned = +basePoints ;
      setScore(score + pointsEarned);
      setStreak(streak + 1);
    } else {
        
      const negativePoints = parseFloat(quizData.negative_marks) || 1;
      setScore(score - negativePoints);
      setStreak(0);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(score + pointsEarned);
    }
  };

  useEffect(() => {
    if (timer === 0) {
      handleSubmit(); 
    }

    const countdown = setInterval(() => {
      setTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleSubmit = () => {
    onComplete(score);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold mb-4">
          Question {currentIndex + 1} of {questions.length}
        </h2>
        <h3 className="text-lg font-semibold">
          Time Left: {formatTime(timer)}
        </h3>
      </div>
      <Question
        questionData={questions[currentIndex]}
        onAnswer={handleAnswer}
      />
      <div className="mt-4 text-center">
        <p className="text-lg">
          Current Score: <span className="font-semibold">{score}</span>
        </p>
        <p className="text-lg">
          Streak: <span className="font-semibold">{streak}</span>
        </p>
      </div>
    </div>
  );
};

export default Quiz;
