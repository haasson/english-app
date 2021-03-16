import React from 'react';

export const ProgressBar = ({current, total, type}) => {
  type = type || 'default'
  const progress = current / total * 100
  const types = {
    word: {text: '', height: 5},
    default: {text: `${current} of ${total}`, height: 15},
  }

  return (
    <div className="progress" style={{height: types[type].height}}>
      <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: `${progress}%`}} aria-valuenow={progress}
           aria-valuemin="0" aria-valuemax="100">
        {types[type].text}
      </div>
    </div>
  );
};