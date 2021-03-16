export const glossaryToArray = (glossary) => {
  return Object.keys(glossary).map(key => ({...glossary[key], id: key }))
}