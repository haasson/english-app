import React from 'react';
import {ConstructLetter} from "../ConstructLetter/ConstructLetter";

export const ConstructWord = ({letters, current}) => {

  return letters.map(({symbol}, i) => (
    <ConstructLetter
      key={i}
      symbol={i < current && symbol}
      isCurrent={i === current}
      mode="word" />
  ))
}