import React, {useState} from 'react';
import {languageScheme} from "../../../helpers/train";
import {TrainAnswerItem} from "../TrainAnswerItem/TrainAnswerItem";
import {Button} from "../../UI/Button/Button";
import {ProgressBar} from "../../UI/ProgressBar/ProgressBar";

export const TranslateSlide = ({word, mode, clickNext}) => {
  const [chosenWord, setChosenWord] = useState();
  const [isCorrect, setIsCorrect] = useState(null);

  const {lang, oppositeLang} = languageScheme(mode)

  const checkAnswer = (idx) => {
    if (typeof chosenWord === "string") return // don't check answer if user already chose one
    if (typeof idx === "number") {
      const answer = word.translations[idx]
      setChosenWord(answer)
      setIsCorrect(answer === word[oppositeLang])
    } else {
      setChosenWord("")
      setIsCorrect(false)
    }
  }

  const translationColor = (idx) => {
    if (typeof chosenWord !== "string") return null // don't apply any style if user doesn't choose one
    const currentWord = word.translations[idx]
    const correctAnswer = word[oppositeLang]

    if (currentWord === correctAnswer) return "list-group-item-success"
    if (currentWord === chosenWord) return "list-group-item-danger"
    return null
  }

  return (
    <div className="row justify-content-center">
      <div className="col-sm-6">
        <div className="card mb-3 mt-5">
          <div className="row no-gutters">
            <div className="col-md-6">
              <div className="card-body d-flex flex-column justify-content-between flex-grow-1" style={{height: '100%'}}>
                <div>
                  <h4 className="card-title">{word[lang]}</h4>
                  <ProgressBar current={word.progress} total={100} type="word" />
                </div>

                {typeof chosenWord === "string"
                  ? <Button clicked={() => clickNext(isCorrect)}>Next</Button>
                  : <Button clicked={checkAnswer} type="outline-primary">I don't know</Button>}
              </div>

            </div>
            <div className="col-md-6">
              <div className="card-body">
                <ul className="list-group">
                  {word.translations.map((translation, idx) => (
                    <TrainAnswerItem
                      color={translationColor(idx)}
                      translation={translation}
                      key={idx}
                      clicked={() => checkAnswer(idx)}
                    />
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
};