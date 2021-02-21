import React, {useState, useEffect} from 'react';
import {Input} from "../../UI/Form/Input/Input";
import {sendNewTranslation} from "../../../store/glossary/actions";
import {useDispatch, useSelector} from "react-redux";

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
        let rusText = e.target.elements.rus.value
        let engText = e.target.elements.eng.value

        if (rusText && engText) {
            dispatch(sendNewTranslation({
                eng: engText,
                engWords: engText.split(" ").length,
                rus: rusText,
                rusWords: rusText.split(" ").length,
                progress: 0,
                created: Date.now()}))
        }
    }
    return (
        <form className="mt-4" onSubmit={submitForm}>
            <div className="row">
                <div className="col">
                    <Input name="eng" placeholder="Enter english text" disabled={freezeForm} cleanup={cleanInput}/>
                </div>
                <div className="col">
                    <Input name="rus" placeholder="Enter translation" disabled={freezeForm} cleanup={cleanInput}/>
                </div>
            </div>
            <button className="btn btn-primary mt-3" type="submit">Send</button>
        </form>
    );
};