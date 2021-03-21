import React, {useState, useEffect} from 'react';
import {Input} from "../../UI/Form/Input/Input";
import {sendNewTranslation} from "../../../store/glossary/actions";
import {useDispatch, useSelector} from "react-redux";
import {capitalize} from "../../../helpers/glossary";

export const GlossaryAddForm = ({}) => {
    const [freezeForm, setFreezeForm] = useState();
    const [cleanInput, setCleanInput] = useState({});
    const dispatch = useDispatch()
    const {addTranslationStatus} = useSelector(s => s.glossary)

    useEffect(() => {
        setFreezeForm(addTranslationStatus === "pending")
        if (addTranslationStatus === "success") setCleanInput({})
    }, [addTranslationStatus])

    const submitForm = (e) => {
        e.preventDefault()
        let rusText = capitalize(e.target.elements.rus.value.trim().toLowerCase())
        let engText = capitalize(e.target.elements.eng.value.trim().toLowerCase())

        if (rusText && engText) {
            dispatch(sendNewTranslation({
                eng: engText,
                engWords: engText.split(" ").length,
                rus: rusText,
                rusWords: rusText.split(" ").length,
                created: Date.now(),
                progress: 0,
                lastTrains: []
            }))
        }
    }
    return (
        <form className="mt-4 text-center" onSubmit={submitForm}>
            <div className="row">
                <div className="col">
                    <Input name="eng" placeholder="Enter english text" disabled={freezeForm} cleanup={cleanInput}/>
                </div>
                <div className="col">
                    <Input name="rus" placeholder="Enter translation" disabled={freezeForm} cleanup={cleanInput}/>
                </div>
            </div>
            <button className="btn btn-primary mt-3" type="submit">Add to glossary</button>
        </form>
    );
};