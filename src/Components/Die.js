import React from "react";

export default function Die(props){

    // console.log(props)

    const onHold = {
        backgroundColor : props.isHeld ? "greenyellow" : props.css ? "white" : "darkgray",
        color : props.css ? "black" : "white",
        textShadow : props.isHeld && !props.css ?  ".5px .5px 9px gray" : ""

    }

    return(
        <div className="dice" onClick={props.toggle} style={onHold}>
            {props.value}
        </div>
    )
}

