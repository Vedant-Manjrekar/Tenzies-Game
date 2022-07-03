import React from "react";

export default function Roll(props) {

    return(
        
            <div className="count"> 
                {props.content} : {props.currentRolls}
            </div>

    )
}