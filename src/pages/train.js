import React, {useState} from 'react'
import {TrainCard} from "../components/Train/TrainCard/TrainCard";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Select from 'react-select'
import {glossaryToArray} from "../helpers/glossary";
import {useFilteredGlossary} from "../hooks/train";
import {appConfig} from "../appConfig";

const options = [
  { value: 'all', label: 'All' },
  { value: 'newest', label: 'Newest' },
  { value: 'almostLearned', label: 'Almost learned' }
]

const Train = () => {
  const [wordsSet, setWordsSet] = useState(options[0].value);

  const {glossary, loading} = useSelector(s => s.glossary)
  const wordsToLearn = glossaryToArray(glossary).filter(item => item.progress < 100)
  const modes = ["translate", "reverse", "construct", "writing"]

  const filteredGlossary = useFilteredGlossary(wordsSet)
  const notEnoughWords = filteredGlossary.length < appConfig.wordsToTrain

  const changeFilter = (option) => {
    setWordsSet(option.value)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!loading && wordsToLearn.length < 10) {
    return (
      <div className="container mt-3 text-center">
        <h4>You're not allowed to train, please add more words to your glossary</h4>
        <Link to="/" >Go to glossary</Link>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row d-flex align-items-center">
        <div className="col-sm-6">
          <h2 className="mt-3">Choose train mode</h2>
        </div>
        <div className="col-sm-6">
          <div className="d-flex align-items-center">
            <span>Choose words:</span>
            <div className="flex-grow-1 ml-5 mr-5">
              <Select options={options} defaultValue={options[0]} onChange={changeFilter} />
            </div>
            <span>{filteredGlossary.length}</span>
          </div>
        </div>
      </div>

      {notEnoughWords &&
        <h5 className={'text-center mt-3'}>You don't have enough words to train. Choose another category</h5>
      }

      <div className="row mt-4">
        {modes.map(mode => (
          <div key={mode} className="col-sm-6 mb-4">
            <TrainCard mode={mode} wordsSet={wordsSet} notEnoughWords={notEnoughWords}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Train