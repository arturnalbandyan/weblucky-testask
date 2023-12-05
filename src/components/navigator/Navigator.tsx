import React from "react";
import styles from "./Navigator.module.scss";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer?: string;
}

const Navigator: React.FC<{
  currentQuestionIndex: number;
  handlePrevQuestion: () => void;
  handleNextQuestion: () => void;
  memoizedQuestions: QuizQuestion[] | null;
}> = ({
  currentQuestionIndex,
  handlePrevQuestion,
  handleNextQuestion,
  memoizedQuestions,
}) => (
  <section className={styles.navigation}>
    {currentQuestionIndex > 0 && (
      <button onClick={handlePrevQuestion}>Previous</button>
    )}
    {currentQuestionIndex < (memoizedQuestions?.length || 0) - 1 && (
      <button onClick={handleNextQuestion}>Next</button>
    )}
    {currentQuestionIndex === (memoizedQuestions?.length || 0) - 1 && (
      <button onClick={handleNextQuestion}>Finish</button>
    )}
  </section>
);

export default Navigator;
