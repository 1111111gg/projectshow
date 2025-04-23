import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useState } from 'react';
import CONSTANTS from 'constants.js';

export default function Undo({player}) {


    const [hasMouse, setMouse, onHasMouseChange] = useState(false);

    const onUndoClick = () => {
            WEBGME_CONTROL.undo(player);    
    }




    const getUndo = () => {

            return (<div> 
                <button
                onClick={onUndoClick} >Undo</button></div>);
    }

    return getUndo();
}