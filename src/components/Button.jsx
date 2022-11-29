import React from "react";

import '../App.css';

function Button(probs){
    
    return(
        <>
            <button className="button" onClick={probs.function}>{probs.description}</button>
        </>

    )
}

export default Button;