import React from "react";

export default function Lister(probs) {
    const fullLevel = 252;
    const curentLevel = (fullLevel*probs.level)/probs.maxLevel;

    return(
        <div className="lister">
            <p className="statusText">{probs.level} / {probs.maxLevel}</p>
            <div className="fullLift" style={{height: fullLevel}}>
                <div style={{height:curentLevel}} className="lift">
                    
                </div>               
            </div>
        </div>
    )
}