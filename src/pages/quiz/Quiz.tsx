import React, { useState, useMemo } from "react";
import Question from "../../components/questions/Questions";
import Navigator from "../../components/navigator/Navigator";
import useFetch from "../../hooks/useFetch";

import styles from "./Quiz.module.scss";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer?: string;
}

const Quiz: React.FC = () => {
  const questions = useFetch("questions.json");
  const memoizedQuestions = useMemo<QuizQuestion[] | null>(
    () => questions,
    [questions]
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [rightAnswers, setRightAnswers] = useState<string[]>([]);
  const [shake, setShake] = useState<boolean>(false);
  const [isQuestionSelected, setIsQuestionSelected] = useState(false);

  const handleSelectOption = (option: string) => {
    const currentQuestion =
      memoizedQuestions && memoizedQuestions[currentQuestionIndex];

    if (currentQuestion && "correctAnswer" in currentQuestion) {
      setUserAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[currentQuestionIndex] = option;
        return updatedAnswers;
      });
      if (option === currentQuestion.correctAnswer) {
        setRightAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          if (!updatedAnswers.includes(option)) {
            updatedAnswers[updatedAnswers.length] = option;
          }
          return updatedAnswers;
        });
      }
      setIsQuestionSelected(true);
    }
  };

  const handleNextQuestion = () => {
    if (isQuestionSelected) {
      setIsQuestionSelected(false);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  };

  const handlePrevQuestion = () => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers.pop();
      return updatedAnswers;
    });
    setRightAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers.pop();
      return updatedAnswers;
    });
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const calculateScore = () => {
    return rightAnswers.length;
  };

  if (!memoizedQuestions) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.quiz}>
      {currentQuestionIndex < memoizedQuestions.length ? (
        <>
          <Question
            key={currentQuestionIndex}
            shake={shake}
            question={memoizedQuestions[currentQuestionIndex].question}
            options={memoizedQuestions[currentQuestionIndex].options}
            selectedOption={userAnswers[currentQuestionIndex] || null}
            onSelectOption={handleSelectOption}
          />
          <Navigator
            currentQuestionIndex={currentQuestionIndex}
            handlePrevQuestion={handlePrevQuestion}
            handleNextQuestion={handleNextQuestion}
            memoizedQuestions={memoizedQuestions}
          />
        </>
      ) : (
        <div className={styles.result}>
          <h2>Your Score: {calculateScore()}</h2>

          {memoizedQuestions.map((item, index) => {
            return (
              <Question
                key={item.question}
                shake={shake}
                item={item}
                question={item.question}
                options={item.options}
                selectedOption={userAnswers[index]}
                onSelectOption={handleSelectOption}
              />
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Quiz;
