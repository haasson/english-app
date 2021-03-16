import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {setSearch} from "../../../../store/glossary/actions";
import {useInput} from "../../../../hooks/app/useInput";

export const Input = ({placeholder, name, disabled, cleanup}) => {
    const dispatch = useDispatch()

    const {value, onChange, clear} = useInput('')

    useEffect(() => {
        clear()
    }, [cleanup])

    useEffect(() => {
        if (name === "search") {
            dispatch(setSearch(value))
        }
    }, [dispatch, name, value])

    return (
        <input
            type="text"
            className="form-control"
            name={name} placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
    );
};