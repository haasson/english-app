import React, {useState, useEffect} from 'react';

export const ConstructLetter = ({id, mode, symbol, isCurrent, isOpen, clicked}) => {
  const [isMistake, setIsMistake] = useState(false);

  const clickLetter = () => {
    setIsMistake(true)
    clicked(id)
  }

  useEffect(() => {
    if (isMistake) {
      setTimeout(() => {
        setIsMistake(false)
      }, 300)
    }
  }, [isMistake]);


  let styles = {
    width: '50px',
    height: '50px',
    margin: '0 5px',
    border: `2px solid ${isCurrent ? '#759de9' : 'transparent'}`,
    boxSizing: 'border-box',
    borderRadius: '5px',
    fontSize: '20px',
    lineHeight: '40px',
    fontWeight: 'bold',
  }

  if (mode === "word") {
    styles = {
      ...styles,
      backgroundColor: `${symbol ? '#b7c8e9' : '#e7edf8'}`
    }
    return <div style={styles}>{symbol}</div>
  } else {
    styles = {...styles, backgroundColor: isMistake ? 'tomato' : '#638de6', color: 'white', cursor: 'pointer'}
    if (isOpen) {
      styles = {...styles, opacity: '0', pointerEvents: 'none'}
    }
    return <div onClick={() => clickLetter()} style={styles}>{symbol}</div>
  }


};