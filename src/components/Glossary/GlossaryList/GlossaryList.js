import React from 'react';
import {GlossaryLine} from "../GlossaryLine/GlossaryLine";

export const GlossaryList = ({list}) => {
    return (
        <ul className="list-group list-group-flush">
            {list.map(({id, eng, rus, created}) => {
                return <GlossaryLine key={id} id={id} eng={eng} rus={rus} />
            })}
        </ul>
    );
};