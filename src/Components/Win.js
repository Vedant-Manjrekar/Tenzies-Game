import React from "react";

export default function Win(props){

    const theme ={
        color: props.css ? "black" : "white"
    }

    return(
        <>
    
        <div className="win" style={theme}>You Won!</div>

        </>
    )
}