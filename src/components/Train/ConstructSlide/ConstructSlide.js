import React, {useState} from 'react';
import {Button} from "../../UI/Button/Button";
import {ConstructWord} from "../ConstructWord/ConstructWord";
import {ConstructLetters} from "../ConstructLetters/ConstructLetters";

export const ConstructSlide = ({word, mode, clickNext}) => {
  const createLetters = () => word.eng.toLowerCase().split('').map((letter, i) => (
    {id:i, symbol: letter, isOpen: false})
  )

  const [letters, setLetters] = useState(createLetters());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hasMistakes, setHasMistakes] = useState(true);

  const checkLetter = (id) => {
    let letter = letters.find(letter => letter.id === id)
    let updatedLetters = [...letters]

    if (letter.symbol === letters[currentIdx].symbol) {
      setCurrentIdx(prev => prev + 1)
      updatedLetters[currentIdx].isOpen = true
    } else {
      updatedLetters[id].isMistake = true
      setHasMistakes(false)
    }
    setLetters(updatedLetters)
  }

  return (
    <div className="row justify-content-center">
      <div className="col-sm-6">
        <div className="card mb-3 mt-5">
          <div className="card-body text-center">
            <h3 className="mb-4">{word.rus}</h3>

            <div className="letters d-flex justify-content-center">
              <ConstructWord letters={letters} current={currentIdx}/>
            </div>
            <hr/>
            <div className="d-flex justify-content-center mb-4">
              <ConstructLetters letters={letters} clicked={checkLetter} />
            </div>
            {currentIdx === letters.length && <Button clicked={() => clickNext(hasMistakes)}>Next</Button>}
          </div>
        </div>
      </div>
    </div>
  )
};