import React from "react";

import Button from "./Button";

export default function Lister(probs) {
    const fullLevel = 252;
    const curentLevel = (fullLevel*probs.level)/probs.maxLevel;

    return(
        <div className="lister">
            <p>{probs.level} / {probs.maxLevel}</p>
            <div className="fullLift" style={{height: fullLevel}}>
                <div style={{height:curentLevel}} className="lift">
                    
                </div>               
            </div>
            
            <Button description={probs.buttDescription}
            function={probs.function}/>
        </div>
    )
}