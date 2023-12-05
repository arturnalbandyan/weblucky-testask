import React, { memo } from "react";
import styles from "./Question.module.scss";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer?: string;
}

interface QuestionProps {
  question: string;
  options: string[];
  selectedOption: string | null;
  onSelectOption: (option: string) => void | undefined;
  shake: boolean;
  item?: QuizQuestion | undefined;
}

const Question: React.FC<QuestionProps> = ({
  question,
  options,
  selectedOption,
  onSelectOption,
  shake,
  item,
}) => {
  const checkClassName = (option: string) => {
    if (!item && option === selectedOption) {
      return styles.selected;
    } else if (option === item?.correctAnswer) {
      return styles.true;
    } else if (option === selectedOption) {
      return styles.wrang;
    }
  };

  return (
    <div className={styles.question}>
      <h3>{question}</h3>
      <ul className={shake ? styles.shake : ""}>
        {options.map((option) => (
          <li
            key={option}
            onClick={() => (onSelectOption ? onSelectOption(option) : null)}
            className={checkClassName(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(Question);
