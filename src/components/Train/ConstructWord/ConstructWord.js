import React from 'react';
import {ConstructLetter} from "../ConstructLetter/ConstructLetter";

export const ConstructWord = ({letters, current}) => {

  return letters.map(({symbol, isOpen}, i) => (
    <ConstructLetter key={i} symbol={isOpen && symbol} isCurrent={i === current} mode="word" />
  ))
}