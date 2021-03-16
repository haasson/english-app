import React from 'react';
import {Link} from "react-router-dom";

export const TrainCard = ({mode}) => {
  const templates = {
    translate: ["English to Russian", "Translate english words and phrases to russian"],
    reverse: ["Russian to English", "Translate russian words and phrases to english"],
    construct: ["Build a word", "Construct a word by separate letters"],
    writing: ["Writing", "Type a whole word by yourself"],
  }

  const content = templates[mode]

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{content[0]}</h5>
        <p className="card-text">{content[1]}</p>
        <Link to={`/train/${mode}`} className="btn btn-primary">Go train!</Link>
      </div>
    </div>
  );
};