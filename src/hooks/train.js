import {useEffect, useState, useMemo} from "react";
import {getRandomNumber, languageScheme} from "../helpers/train";
import {useSelector} from "react-redux";
import {glossaryToArray} from "../helpers/glossary";

export const useTrainList = (mode) => {
  let needTranslations = true
  if (mode === "construct" || mode === "writing") {
    needTranslations = false
  }
  const {lang} = languageScheme(mode)
  return useWords({lang, needTranslations})
}

export const useWords = ({count = 3, lang, needTranslations = true}) => {
  const [words, setWords] = useState([]);
  let {glossary} = useSelector(s => s.glossary)

  glossary = useMemo(() => glossaryToArray(glossary), [glossary.length]);
  useEffect(() => {
    if (glossary.length) {
      createList()
    }
  }, [glossary.length])

  const createList = () => {
    const list = getWords()
    if (needTranslations) {
      list.forEach(word => {
        word.translations = getTranslations(word, lang)
      })
    }
    setWords([...words, ...list])
  }

  const getWords = (wordsCount = count) => {
    const indexes = new Set()
    const incompleteList = glossary.filter(word => word.progress < 100)

    while (indexes.size < wordsCount) {
      indexes.add(getRandomNumber(0, incompleteList.length - 1))
    }
    return Array.from(indexes).map(num => incompleteList[num])
  }

  const getTranslations = (word, lang) => {
    const language = lang === "rus" ? "eng" : "rus"
    const translations = getWords(6).map(el => el[language])

    if (!translations.includes(word[language])) {
      console.log(translations)
      const randomIndex = getRandomNumber(0, translations.length - 1)
      translations[randomIndex] = word[language]
    }

    return translations
  }
  return words
}
