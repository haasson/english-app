import React from 'react';

export const TrainAnswerItem = ({translation, color, clicked}) => {
  return (
    <li className={`list-group-item ${color || ''}`} style={{cursor: 'pointer'}} onClick={clicked}>{translation}</li>
  );
};