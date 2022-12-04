import React from "react";

import '../App.css';

function Button({func, description}){
    
    return(
        <>
            <button className="button" onClick={func}>{description}</button>
        </>

    )
}

export default Button;