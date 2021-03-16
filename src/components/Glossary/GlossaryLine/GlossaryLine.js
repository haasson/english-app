import React from 'react';
import {useDispatch} from "react-redux";
import {removeTranslation} from "../../../store/glossary/actions";

export const GlossaryLine = ({word}) => {
    const dispatch = useDispatch()

  const {id, eng, rus, progress} = word
    const removeItem = () => {
        dispatch(removeTranslation(id))
    }

    return (
        <div className="d-flex justify-content-between list-group-item">
            <div><strong>{eng}</strong> - {rus}</div>
            <div className="controls">
              <strong>{progress}</strong>
              <button type="button" className="btn btn-danger" onClick={removeItem}>&times;</button>
            </div>

        </div>

    );
};