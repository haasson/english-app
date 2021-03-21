import {useEffect, useState} from 'react';

export const useKeyboardPress = () => {
  const [key, setKey] = useState(null);

  useEffect(() => {
    document.addEventListener('keypress', onKeyPress)
    return () => {
      document.removeEventListener("keypress", onKeyPress)
    }
  })

  const onKeyPress = (e) => {
    setKey(e.key)
  }

  return key
};