export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const languageScheme = (mode) => {
  const modes = {
    translate: {lang: 'eng', oppositeLang: 'rus'},
    reverse: {lang: 'rus', oppositeLang: 'eng'}
  }
  return modes[mode] || {lang: 'eng', oppositeLang: 'rus'}
}

export const randomizeArray = (array) => {
  const resultArray = [...array]
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomNumber(0, i);
    [resultArray[i], resultArray[j]] = [resultArray[j], resultArray[i]];
  }
  return resultArray
}