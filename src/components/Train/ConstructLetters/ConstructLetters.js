import React, {useMemo, useState} from 'react';
import {randomizeArray} from "../../../helpers/train";
import {ConstructLetter} from "../ConstructLetter/ConstructLetter";

export const ConstructLetters = ({letters, current, clicked}) => {
  const [randomLetters, setRandomLetters] = useState([]);
  useMemo(() =>  {
    const randomArray = randomizeArray(letters)
    setRandomLetters(randomArray)
  }, [letters.length])

  return randomLetters.map(({id, symbol}, i) => (
    <ConstructLetter
      mode="answer"
      key={id}
      id={id}
      clicked={clicked}
      symbol={symbol}
      isHidden={current > id}
      isNext={letters[current] === letters[id]}
    />
  ))
}