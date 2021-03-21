import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import {useTrainList} from "../../../hooks/train";
import {updateProgress} from "../../../store/glossary/actions";
import {TranslateSlide} from "../TranslateSlide/TranslateSlide";
import {TrainResultSlide} from "../TrainResultSlide/TrainResultSlide";
import {ProgressBar} from "../../UI/ProgressBar/ProgressBar";
import {ConstructSlide} from "../ConstructSlide/ConstructSlide";
import {useHistory, useLocation, useParams} from "react-router";
import {WritingSlide} from "../WritingSlide/WritingSlide";

export const TrainManager = () => {
  const {mode} = useParams()
  const search = useLocation().search;
  const wordsSet = new URLSearchParams(search).get('wordsSet');

  const dispatch = useDispatch()
  const [current, setCurrent] = useState(0)
  const [isFinished, setIsFinished] = useState();

  const [correctList, setCorrectList] = useState([]);
  const [wrongList, setWrongList] = useState([]);
  const answersList = useRef([]);

  const words = useTrainList(mode, {wordsSet})

  useEffect(() => {
    return () => {
      saveProgress()
    }
  }, [])

  const saveProgress = () => {
    const list = answersList.current.map(el => {
      let lastTrains = el.lastTrains ? [...el.lastTrains] : []

      lastTrains.push(true)
      if (lastTrains.length > 5) {
        lastTrains.unshift()
      }

      const progressPoints = lastTrains.reduce((memo, value, i) => {
        return value ? i + 1 : 0
      }, 0)
      return {
        id: el.id,
        progress: el.progress + progressPoints,
        lastTrains
      }
    })
    dispatch(updateProgress(list))
  }

  const saveAnswer = (isCorrect) => {
    const currentWord = words[current]
    if (isCorrect) {
      setCorrectList(prev => [...prev, currentWord])
      answersList.current.push(currentWord)
    } else {
      setWrongList(prev => [...prev, currentWord])
    }
    showNextSlide()
  }

  const showNextSlide = () => {
    if (current === words.length - 1) {
      setIsFinished(true)
    } else {
      setCurrent(current => current + 1)
    }
  }

  const Slide = () => {
    const options = {
      word: words[current],
      mode,
      clickNext: saveAnswer
    }
    if (words.length) {
      if (mode === "construct") {
        return <ConstructSlide {...options} />
      }
      if (mode === "writing") {
        return <WritingSlide {...options} />
      }
      return <TranslateSlide {...options} />
    } else {
      return <div>Loading...</div>
    }
  }

  return (
    <div className="container mt-3">
      <ProgressBar current={current+1} total={words.length} />
      {isFinished
        ? <TrainResultSlide mode={mode} correctList={correctList} wrongList={wrongList} length={words.length} />
        : <Slide />}
    </div>
  );
}