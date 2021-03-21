import React from 'react';

export const ProgressBar = ({current, total = 100, type = "default", color = ""}) => {
  const progress = current / total * 100
  const types = {
    word: {text: '', height: 5},
    default: {text: `${current} of ${total}`, height: 15},
  }

  return (
    <div className="progress" style={{width: "100%",height: types[type].height}}>
      <div className={`progress-bar ${color}`} role="progressbar" style={{width: `${progress}%`}} aria-valuenow={progress}
           aria-valuemin="0" aria-valuemax="100">
        {types[type].text}
      </div>
    </div>
  );
};