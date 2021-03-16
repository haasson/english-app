import {act} from "@testing-library/react";

const initialState = {
  glossary: [],
  search: '',
  filter: 'progress',
  addTranslationStatus: 'success',
  loading: true,
  error: null
}

const glossaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ("FETCH_GLOSSARY_SUCCESS"):
      return { ...state, glossary: action.glossary, loading: false }
    case ("START_ADDING_TRANSLATION"):
      return { ...state, addTranslationStatus: "pending" }
    case ("ADD_TRANSLATION_SUCCESS"):
      const {id, ...props} = action.translation
      return { ...state, glossary: {...state.glossary, [id]: props}, addTranslationStatus: "success" }
    case ("REMOVE_TRANSLATION_SUCCESS"):
      const newGlossary = {...state.glossary}
      delete newGlossary[action.id]
      return { ...state, glossary: newGlossary}
    case ("SET_SEARCH"):
      return {...state, search: action.str}
    case ("SET_FILTER"):
      return {...state, filter: action.filter}
    case ("UPDATE_PROGRESS"):
      const updatedGlossary = {...state.glossary}
      action.list.forEach(el => updatedGlossary[el.id].progress = el.progress)
      return {...state, glossary: updatedGlossary }
    default:
      return state
  }
}

export default glossaryReducer