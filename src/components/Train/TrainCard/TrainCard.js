import React from 'react';
import {Link} from "react-router-dom";

export const TrainCard = ({mode, wordsSet, notEnoughWords}) => {
  const templates = {
    translate: ["English to Russian", "Translate english words and phrases to russian"],
    reverse: ["Russian to English", "Translate russian words and phrases to english"],
    construct: ["Build a word", "Construct a word by separate letters"],
    writing: ["Writing", "Type a whole word by yourself"],
  }

  const overlay = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,.5)'
  }

  const description = templates[mode]

  return (
    <div className="card" style={{position: "relative"}}>
      {notEnoughWords && <div style={overlay}></div>}
      <div className="card-body">
        <h5 className="card-title">{description[0]}</h5>
        <p className="card-text">{description[1]}</p>
        <Link to={`/train/${mode}/?wordsSet=${wordsSet}`} className="btn btn-primary">Go train!</Link>
      </div>

    </div>
  );
};