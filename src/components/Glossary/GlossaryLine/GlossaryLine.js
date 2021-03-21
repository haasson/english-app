import React from 'react';
import {useDispatch} from "react-redux";
import {removeTranslation} from "../../../store/glossary/actions";
import {ProgressBar} from "../../UI/ProgressBar/ProgressBar";

export const GlossaryLine = ({word}) => {
    const dispatch = useDispatch()

    const {id, eng, rus, progress} = word
    const removeItem = () => {
        dispatch(removeTranslation(id))
    }

    let progressColor;
    if (progress < 30) {
      progressColor = "bg-danger"
    } else if (progress < 70) {
      progressColor = "bg-warning"
    } else {
      progressColor = "bg-success"
    }

    return (
      <div className="d-flex justify-content-between list-group-item">
        <div className="flex-grow-1"><strong>{eng}</strong> - {rus}</div>
        <div className="progress-block d-flex align-items-center" style={{width: 100, marginRight: 30}}>
          <ProgressBar type="word" current={progress} color={progressColor}/>
        </div>

        <div className="controls">
          <button type="button" className="btn btn-danger" onClick={removeItem}>&times;</button>
        </div>

      </div>

    );
};