import React from "react";

export default function Die(props){

    // console.log(props)

    const onHold = {
        backgroundColor : props.isHeld ? "greenyellow" : props.css ? "white" : "darkgray",
        color : props.css ? "black" : "white",
        textShadow : props.isHeld ?  ".5px 1px 22px black" : ""

    }

    return(
        <div className="dice" onClick={props.toggle} style={onHold}>
            {props.value}
        </div>
    )
}

