const initialState = {
  glossary: [],
  search: '',
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
      return { ...state, glossary: [...state.glossary, action.translation], addTranslationStatus: "success" }
    case ("REMOVE_TRANSLATION_SUCCESS"):
      return { ...state, glossary: state.glossary.filter(item => item.id !== action.id) }
    case ("SET_FILTER"):
      return {...state, search: action.str}
    default:
      return state
  }
}

export default glossaryReducer