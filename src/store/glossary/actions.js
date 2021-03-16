import firebase from 'firebase'

export const fetchGlossary = () => {
  return async dispatch => {
    try {
      let glossary = (await firebase.database().ref("glossary").once("value")).val() || {}
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
      dispatch(addNewTranslationSuccess({id: newTranslation.key, ...translation}))
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

export const updateProgress = (words) => {
  return async dispatch => {
    try {
      const updates = {}
      words.forEach(word => {
        updates[`glossary/${word.id}/progress`] = word.progress
      })
      await firebase.database().ref().update(updates)
      dispatch(updateTranslationProgress(words))
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
export const setSearch = (str) => {
  return { type: "SET_SEARCH", str }
}
export const setFilter = (filter) => {
  return { type: "SET_FILTER", filter }
}
export const updateTranslationProgress = (list) => {
  return { type: "UPDATE_PROGRESS", list }
}