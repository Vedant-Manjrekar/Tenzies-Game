import React from "react";

export default function Header(props){

    const theme = {
        color: props.css ? "black" : "white"
    }

    return(

        <>
            {/* <div className="heading" style={theme}></div> */}
            
            <div className="instructions" style={theme}>
                Roll until all dice are the same.
                Click each die to freeze it at its current value between rolls.
            </div>
        </>
    )

}

