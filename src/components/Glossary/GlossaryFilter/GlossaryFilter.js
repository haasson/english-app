import React from 'react';
import {Input} from "../../UI/Form/Input/Input";
import {useDispatch} from "react-redux";
import {setFilter} from "../../../store/glossary/actions";

export const GlossaryFilter = () => {
    const dispatch = useDispatch()

    const changeFilter = (e) => {
        dispatch(setFilter(e.target.dataset.filter))
    }

    return (
        <form className="mt-4">
            <div className="row">
                <div className="col">
                    <Input name="search" placeholder="Search..." />
                </div>
                <div className="col d-flex justify-content-between align-items-center">
                    <strong>Glossary filters:</strong>
                    <span className="btn btn-warning ml-3" data-filter="progress" onClick={changeFilter}>In progress</span>
                    <span className="btn btn-warning ml-3" data-filter="completed" onClick={changeFilter}>Completed</span>
                    <span className="btn btn-warning" data-filter="all" onClick={changeFilter}>All glossary</span>
                </div>
            </div>
            <div className="row mt-3 mr-5">


            </div>
        </form>
    );
};