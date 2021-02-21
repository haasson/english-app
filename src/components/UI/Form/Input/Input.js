import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {setFilter} from "../../../../store/glossary/actions";

export const Input = ({placeholder, name, disabled, cleanup, change}) => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch()

    useEffect(() => {
        setValue('')
    }, [cleanup])

    useEffect(() => {
        if (name === "search") {
            dispatch(setFilter(value))
        }
    }, [dispatch, name, value])

    const changeInput = (e) => {
        setValue(e.target.value)
    }

    return (
        <input
            type="text"
            className="form-control"
            name={name} placeholder={placeholder}
            value={value}
            onChange={changeInput}
            disabled={disabled}
        />
    );
};