import React, {useState, useEffect} from 'react';

export const ConstructLetter = ({id, mode, symbol, isCurrent, isHidden, isNext, clicked}) => {
  const [isRed, setIsRed] = useState(false);

  useEffect(() => {
    if (isRed) {
      setTimeout(() => {
        setIsRed(false)
      }, 500)
    }
  }, [isRed])

  let styles = {
    width: '50px',
    height: '50px',
    margin: '5px',
    boxSizing: 'border-box',
    borderRadius: '5px',
    fontSize: '20px',
    lineHeight: '40px',
    fontWeight: 'bold',
    border: '2px solid transparent'
  }

  const clickLetter = () => {
    if (!isNext) {
      setIsRed(true)
    }
    clicked(isNext)
  }

  if (mode === "word") {
    styles = {
      ...styles,
      backgroundColor: `${symbol ? '#b7c8e9' : '#e7edf8'}`,
      border: `2px solid ${isCurrent ? '#759de9' : 'transparent'}`,
    }
    return <div style={styles}>{symbol}</div>
  } else {
    styles = {
      ...styles,
      flexWrap: 'wrap',
      backgroundColor: isRed ? 'tomato' : '#638de6',
      color: 'white',
      cursor: 'pointer',
    }
    if (isHidden) {
      styles = {...styles, opacity: '0', pointerEvents: 'none'}
    }
    return <div onClick={clickLetter} style={styles}>{symbol}</div>
  }


};