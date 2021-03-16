import {useEffect, useRef} from 'react';

export const useCustomRef = (prop) => {
  const ref = useRef(prop);

  useEffect(() => {
    debugger
    ref.current = prop
  }, [prop]);


  return ref.current
};