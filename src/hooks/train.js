import {useEffect, useState, useMemo} from "react";
import {getRandomNumber, languageScheme} from "../helpers/train";
import {useSelector} from "react-redux";
import {glossaryToArray} from "../helpers/glossary";
import {appConfig} from "../appConfig";

export const useTrainList = (mode, {wordsSet}) => {
  let needTranslations = true
  if (mode === "construct" || mode === "writing") {
    needTranslations = false
  }
  const {lang} = languageScheme(mode)
  return useWords({lang, needTranslations, wordsSet})
}

export const useWords = ({count = appConfig.wordsToTrain, lang, needTranslations = true, wordsSet}) => {
  const [words, setWords] = useState([]);

  // let {glossary} = useSelector(s => s.glossary)

  // glossary = useMemo(() => glossaryToArray(glossary), [glossary.length]);
  const filteredGlossary = useFilteredGlossary(wordsSet)
  console.log(filteredGlossary)

  useEffect(() => {
    if (filteredGlossary.length) {
      createList()
    }
  }, [filteredGlossary.length])

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

    while (indexes.size < wordsCount) {
      indexes.add(getRandomNumber(0, filteredGlossary.length - 1))
    }
    return Array.from(indexes).map(num => filteredGlossary[num])
  }

  const getTranslations = (word, lang) => {
    const language = lang === "rus" ? "eng" : "rus"
    const translations = getWords(6).map(el => el[language])

    if (!translations.includes(word[language])) {
      const randomIndex = getRandomNumber(0, translations.length - 1)
      translations[randomIndex] = word[language]
    }

    return translations
  }
  return words
}

export const useFilteredGlossary = (filter) => {
  let {glossary} = useSelector(s => s.glossary)
  const glossaryArr = glossaryToArray(glossary)

  const [filteredList, setFilteredList] = useState([])

  useEffect(() => {
    let newList
    if (filter === "all") {
      newList = glossaryArr.filter(word => word.progress < 100)
    } else if (filter === "newest") {
      newList = glossaryArr.filter(word => Date.now() - word.created < 1209600000) // 2 weeks
    } else if (filter === "almostLearned") {
      newList = glossaryArr.filter(word => word.progress < 100 && word.progress > 70)
    }
    setFilteredList(newList)
  }, [glossaryArr.length, filter])

  return filteredList
}
