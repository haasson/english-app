import React from 'react';
import {Input} from "../../UI/Form/Input/Input";

export const GlossaryFilter = () => {

    const onChangeInput = (a) => {
        console.log(a)
    }

    return (
        <form className="mt-4">
            <div className="row">
                <div className="col">
                    <Input name="search" placeholder="Search..." change={onChangeInput} />
                </div>
            </div>
        </form>
    );
};