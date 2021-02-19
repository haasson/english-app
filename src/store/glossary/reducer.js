const initialState = {
  glossary: 0
}

const glossaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ("FETCH_GLOSSARY_SUCCESS"):
      return { ...state, glossary: action.glossary }
    default:
      return state
  }
}

export default glossaryReducer