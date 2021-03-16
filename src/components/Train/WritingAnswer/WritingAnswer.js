import React from 'react';
import {Button} from "../../UI/Button/Button";

export const WritingAnswer = ({word, answer, clicked}) => {
  const isCorrect = word.toLowerCase() === answer.toLowerCase()

  const answerStyles = {
    textDecoration: 'line-through',
    color: 'red',
    fontSize: '20px'
  }

  const wordStyles = {
    fontSize: '22px',
    color: 'green'
  }

  return (
    <div className="text-center">
      <div className="mb-4">
        <p className={isCorrect && 'd-none'} style={answerStyles}>{answer}</p>
        <p style={wordStyles}>{word}</p>
      </div>
      <Button clicked={() => clicked(isCorrect)}>Next</Button>
    </div>
  );
};