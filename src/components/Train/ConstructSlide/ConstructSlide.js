import React, {useState, useEffect, useMemo, useRef} from 'react';
import {Button} from "../../UI/Button/Button";
import {ConstructWord} from "../ConstructWord/ConstructWord";
import {ConstructLetters} from "../ConstructLetters/ConstructLetters";

export const ConstructSlide = ({word, clickNext}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isCorrect, setIsCorrect] = useState(true);
  const currentRef = useRef(0);

  useEffect(() => {
    document.addEventListener("keypress", onKeyPress)
    return () => {
      document.removeEventListener("keypress", onKeyPress)
    }
  }, [])

  const letters = useMemo(() => {
    return word.eng.toLowerCase().split('').map((letter, i) => ({id:i, symbol: letter}))
  }, [word]);

  const checkLetter = (isCorrectLetter) => {
    if (isCorrectLetter) {
      setCurrentIdx(prev => prev + 1)
      currentRef.current++
    } else {
      setIsCorrect(false)
    }
  }

  const onKeyPress = (e) => {
    if (currentRef.current < letters.length) {
      const isCorrectLetter = e.key === letters[currentRef.current].symbol
      checkLetter(isCorrectLetter)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-sm-8">
        <div className="card mb-3 mt-5">
          <div className="card-body text-center">
            <h3 className="mb-4">{word.rus}</h3>

            <div className="letters d-flex justify-content-center">
              <ConstructWord letters={letters} current={currentIdx}/>
            </div>
            <hr/>
            <div className={`justify-content-center mb-4 ${currentIdx === letters.length ? 'd-none' : 'd-flex'}`}>
              <ConstructLetters letters={letters} current={currentIdx} clicked={checkLetter} />
            </div>
            {currentIdx === letters.length && <Button clicked={() => clickNext(isCorrect)}>Next</Button>}
          </div>
        </div>
      </div>
    </div>
  )
};