import firebase from 'firebase'

export const fetchGlossary = () => {
  return async dispatch => {
    try {
      let glossary = (await firebase.database().ref("glossary").once("value")).val() || {}
      glossary = Object.keys(glossary).map(key => ({
        id: key,
        eng: glossary[key].eng,
        rus: glossary[key].rus,
        progress: glossary[key].progress
      }))
      dispatch(fetchGlossarySuccess(glossary))
    } catch (e) {
      debugger
      console.error('Ошибка', e)
      // dispatch(fetchContractError(e))
    }
  }
}

export const sendNewTranslation = (translation) => {
  return async dispatch => {
    try {
      dispatch(startAddingTranslation())
      let newTranslation = await firebase.database().ref("glossary").push(translation)
      dispatch(addNewTranslationSuccess({...translation, id: newTranslation.key}))
    } catch (e) {
      console.error('Ошибка', e)
      // dispatch(fetchContractError(e))
    }
  }
}

export const removeTranslation = (key) => {
  return async dispatch => {
    try {
      await firebase.database().ref("glossary").child(key).remove()
      dispatch(removeTranslationSuccess(key))
    } catch (e) {
      console.error('Ошибка', e)
      // dispatch(fetchContractError(e))
    }
  }
}



const fetchGlossarySuccess = (glossary) => {
  return { type: "FETCH_GLOSSARY_SUCCESS", glossary }
}
const startAddingTranslation = () => {
  return { type: "START_ADDING_TRANSLATION" }
}
const addNewTranslationSuccess = (translation) => {
  return { type: "ADD_TRANSLATION_SUCCESS", translation }
}
const removeTranslationSuccess = (id) => {
  return { type: "REMOVE_TRANSLATION_SUCCESS", id }
}
export const setFilter = (str) => {
  return { type: "SET_FILTER", str }
}