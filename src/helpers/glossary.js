export const glossaryToArray = (glossary = {}) => {
  return Object.keys(glossary).map(key => ({...glossary[key], id: key }))
}

export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}