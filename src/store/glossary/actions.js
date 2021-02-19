import firebase from 'firebase'

export const fetchGlossary = () => {
  // debugger
  return async dispatch => {
    try {
      let glossary = (await firebase.database().ref("users").once("value")).val()
      dispatch(fetchGlossarySuccess(glossary))
    } catch (e) {
      console.error('Ошибка', e)
      // dispatch(fetchContractError(e))
    }
  }
}

const fetchGlossarySuccess = (glossary) => {
  return { type: "FETCH_GLOSSARY_SUCCESS", glossary }
}