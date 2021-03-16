import React from 'react';
import {useHistory} from "react-router";
import {languageScheme} from "../../../helpers/train";
import {Button} from "../../UI/Button/Button";

export const TrainResultSlide = ({mode, correctList, wrongList, length}) => {
  const history = useHistory()
  const {lang, oppositeLang} = languageScheme(mode)

  const backToTrains = () => {
    history.push("/train")
  }

  return (
    <>
      <h3>Complete</h3>
      <div className="row justify-content-center">
        <div className="col-sm-6">
          <div className="card mb-3 mt-4">
            <div className="card-body">
              <div className="mb-3">Correct answers: {correctList.length} of {length} questions</div>
              {
                wrongList.length ?
                  <>
                    <h5>Mistakes</h5>
                    <ul className="list-group mb-3">
                      {wrongList.map(el => <li className="list-group-item" key={el.id}><strong>{el[lang]}</strong> - {el[oppositeLang]}</li>)}
                    </ul>
                  </>
                  : null
              }

              {
                correctList.length ?
                  <>
                    <h5>Correct</h5>
                    <ul className="list-group mb-4">
                      {correctList.map(el => <li className="list-group-item"  key={el.id}><strong>{el[lang]}</strong> - {el[oppositeLang]}</li>)}
                    </ul>
                  </>
                  : null
              }
              <Button clicked={backToTrains}>Back</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};