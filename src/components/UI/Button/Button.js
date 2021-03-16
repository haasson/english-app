import React from 'react';

export const Button = ({clicked, type, children}) => {
  return (
    <button className={`btn btn-${type || 'primary'}`} onClick={clicked}>{children}</button>
  );
};