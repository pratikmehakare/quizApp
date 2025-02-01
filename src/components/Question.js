import React, { useState } from "react";

const Question = ({ questionData, onAnswer }) => {
  const { description, options } = questionData;
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleChoiceClick = (choice) => {
    if (answered) return;
    setSelectedChoice(choice);
    setAnswered(true);
    const isCorrect = choice.is_correct;
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedChoice(null);
      setAnswered(false);
    }, 1000);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{description}</h3>
      <ul className="space-y-3">
        {options.map((choice) => {
          let btnClasses =
            "w-full py-2 px-4 rounded border transition-colors focus:outline-none";
          if (answered) {
            if (choice.is_correct) {
              btnClasses += " bg-green-500 text-white border-green-500";
            } else if (selectedChoice && choice.id === selectedChoice.id) {
              btnClasses += " bg-red-500 text-white border-red-500";
            } else {
              btnClasses += " bg-gray-100 text-gray-600";
            }
          } else {
            btnClasses += " bg-white hover:bg-gray-200 border-gray-300 text-gray-800";
          }
          return (
            <li key={choice.id}>
              <button
                className={btnClasses}
                onClick={() => handleChoiceClick(choice)}
                disabled={answered}
              >
                {choice.description}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Question;
