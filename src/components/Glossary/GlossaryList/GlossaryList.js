import React from 'react';
import {GlossaryLine} from "../GlossaryLine/GlossaryLine";

export const GlossaryList = ({list}) => {
    return (
        <ul className="list-group list-group-flush mt-3">
            {list.map(word => {
                return <GlossaryLine key={word.id} word={word} />
            })}
        </ul>
    );
};