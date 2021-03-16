import React, {useState, useEffect} from 'react';
import {Button} from "../../UI/Button/Button";
import {Input} from "../../UI/Form/Input/Input";
import {WritingAnswer} from "../WritingAnswer/WritingAnswer";

export const WritingSlide = ({word, clickNext}) => {
  const [answer, setAnswer] = useState('');

  const checkWord = (e) => {
    e.preventDefault()
    setAnswer(e.target.elements.writing.value)
  }

  const Content = () => {
    if (answer) {
      return <WritingAnswer word={word.eng} answer={answer} clicked={clickNext} />
    } else {
      return (
        <form className="text-center" onSubmit={checkWord}>
          <Input className="mb-3" name="writing" />
          <Button>Check</Button>
        </form>
      )
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-sm-6">
        <div className="card mb-3 mt-5">
          <div className="card-body text-center">
            <h3 className="mb-4">{word.rus}</h3>
              <Content />
          </div>
        </div>
      </div>
    </div>
  )
}