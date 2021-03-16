import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import {useTrainList} from "../../../hooks/train";
import {updateProgress} from "../../../store/glossary/actions";
import {TranslateSlide} from "../TranslateSlide/TranslateSlide";
import {TrainResultSlide} from "../TrainResultSlide/TrainResultSlide";
import {ProgressBar} from "../../UI/ProgressBar/ProgressBar";
import {ConstructSlide} from "../ConstructSlide/ConstructSlide";
import {useParams} from "react-router";

export const TrainManager = () => {
  const {mode} = useParams()
  const dispatch = useDispatch()
  const [current, setCurrent] = useState(0)
  const [isFinished, setIsFinished] = useState();

  const [correctList, setCorrectList] = useState([]);
  const [wrongList, setWrongList] = useState([]);
  const answersList = useRef([]);

  const words = useTrainList(mode)

  useEffect(() => {
    return () => {
      saveProgress()
    }
  }, [])

  const saveProgress = () => {
    const list = answersList.current.map(el => ({id: el.id, progress: el.progress + 5}))
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
    if (words.length) {
      console.log(mode)
      if (mode === "construct") {
        return <ConstructSlide word={words[current]} mode={mode} clickNext={saveAnswer}/>
      }
      return <TranslateSlide word={words[current]} mode={mode} clickNext={saveAnswer}/>
    } else {
      return <div>Loading...</div>
    }
  }

  return (
    <div className="container mt-3">
      <ProgressBar current={current+1} total={3} />
      {isFinished
        ? <TrainResultSlide mode={mode} correctList={correctList} wrongList={wrongList} length={words.length} />
        : <Slide/>}
    </div>
  );
}