import firebase from 'firebase'
import {useAuthentication} from "../../hooks/app/useAuthentication";
import {useList} from "react-firebase-hooks/database";
import {useState, useEffect, useMemo, useContext} from "react";
import {useDispatch} from "react-redux";
import {AuthContext} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";

const getUserUid = () => {
  const user = firebase.auth().currentUser
  if (!user) throw new Error('user_not_found')
  return user.uid
}

export const fetchGlossary = () => {
  return async dispatch => {
    try {
      const uid = getUserUid()
      const db = firebase.database()
      let glossary = (await db.ref(`users/${uid}/glossary`).once("value")).val() || {}
      dispatch(fetchGlossarySuccess(glossary))
    } catch (e) {
      if (e.message === 'user_not_found') return
      debugger
      console.error('Ошибка', e)
      // dispatch(fetchContractError(e))
    }
  }
}


// export const useFetchGlossary = () => {
//   const [uid, setUid] = useState(null);
//   const [user] = useAuthentication()
//   const dispatch = useDispatch()
//
//   useEffect(() => {
//     if (user) {
//       setUid(user.id)
//     }
//   }, [user])
//
//   const [glossary, loading, error] = useList(firebase.database().ref(`users/${uid}/glossary`))
//   const payload = {glossary, loading, error}
//
//   useMemo(() => {
//     return dispatch({ type: "FETCH_GLOSSARY_SUCCESS", payload })
//   }, [glossary.length, loading, error])
//
// };

export const sendNewTranslation = (translation) => {
  return async dispatch => {
    try {
      const uid = getUserUid()
      const db = firebase.database()
      dispatch(startAddingTranslation())
      let newTranslation = await db.ref(`/users/${uid}/glossary`).push(translation)
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
      const uid = getUserUid()
      const db = firebase.database()
      await db.ref(`/users/${uid}/glossary`).child(key).remove()
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
      const uid = getUserUid()
      const db = firebase.database()
      const updates = {}
      words.forEach(word => {
        let url = `/users/${uid}/glossary/${word.id}`

        updates[`${url}/progress`] = word.progress
        updates[`${url}/lastTrains`] = word.lastTrains
      })
      await db.ref().update(updates)
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