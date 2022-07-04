import React from "react"
import Die from "./Components/Die";
import Header from "./Components/Header";
import Win from "./Components/Win";
import Roll from "./Components/Rolls";
import Button from "./Components/Button";
import {nanoid} from "nanoid";
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize'


export default function App() {
  const { width, height } = useWindowSize()

  const [dice, setDice] = React.useState(generateArrayOfRandomNumbers(generateArrayOfRandomNumbers()));
  const [tenzies, setTenzies] = React.useState(false);
  const [roll, setRoll] = React.useState(0);
  const [topScore, setTopScore] = React.useState(0);
  const [theme, setTheme] = React.useState(true);

  React.useEffect(() => {

    // checks for all values in dice and returns true if all values are true.
    const checkHeldValue = dice.every(die => die.isHeld )

    // checks whether all values are equal to the 0th element of dice array.
    const checkValue = dice.every(die => die.value === dice[0].value)

    // if checkHeldValue and checkValue are true setTenzies (its state) to true.
    if (checkHeldValue && checkValue === true) {
      setTenzies(true);
    }

    // initialised an array.
    let topScoreArray = []

    // pushing the value obtained from local storage into the array.
    localStorage.getItem('top-score') ? topScoreArray.push(...JSON.parse(localStorage.getItem("top-score"))) : localStorage.setItem("top-score", "");

    
    // setting topScore array to the minimum value present in setTopScore array.
    setTopScore(Math.min(...topScoreArray))

    // set topscore to 0 if localstorage is empty.
    !localStorage.getItem('top-score') && setTopScore(0);

  }, [dice])

  
  // generates an array of objects with properties like id, value, isHeld.
  function generateArrayOfRandomNumbers() {
    const randomArray = [];
    
    // generating 10 array objects and pushing them into above array simultaneously.
    for (let i = 0; i < 10; i++) {
      randomArray.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      });
    }
    
    // returning the array.
    return randomArray
    
  }
  
  // function for rollDice (when Roll clicked.)
  function rollDice(){
    
    // if tenzies (state) is true.
    if (tenzies) {
      
      // setting roll (state) to 0.
      setRoll(0);
      
      // initialised and array.
      const scoreArray = [];
      
      // variable for checking contents of localstorage array.
      let checkLocalStorage = localStorage.getItem("top-score");
      
      // if contents of localstorage is empty.
      if(checkLocalStorage === ""){
        
        // add the current roll count to the initialized array.
        scoreArray.push(roll);

        // save that array to local storage.
        localStorage.setItem("top-score", JSON.stringify(scoreArray));
        
        // setTopScore(scoreArray)
        
      }

      // if local storage is not empty.
      else{
        
        // add localstorage content + current roll count in scoreArray 
        // spread operator is used otherwise scoreArray will store the array from localstorage as it is without destructuring it, like [1, [1,2], [1,2,5]]
        scoreArray.push(...(JSON.parse(localStorage.getItem("top-score"))),roll);

        // save array to localStorage.
        localStorage.setItem("top-score", JSON.stringify(scoreArray));

        setTopScore(scoreArray)
        // console.log(scoreArray);

      }

      // set tenzies (state) to false.
      setTenzies(false);

      // Generates new array of ojects to start newGame.
      setDice(generateArrayOfRandomNumbers());

    }

    // if tenzies is false.
    else{

      // set roll (state) to its previous value + 1.
      setRoll(prevRoll => prevRoll + 1);
      
      // mapping dice to check value of dice.isHeld,
      // if found true keep that object as it is,
      // if found false change its value property keeping all other properties intact.
      setDice(oldState => {
        return oldState.map(elmnt => {
          return elmnt.isHeld ? elmnt : {...elmnt, value: Math.ceil(Math.random() * 6) }
        })
      });


    }
  }

  // function for resetting dice.
  function resetDice() {
    setDice(generateArrayOfRandomNumbers());
    setRoll(0);
  }

  // function for changing .isHeld property from false to true and vice-versa when called.
  function toggle(id) {

    setDice(oldDice => {
     return oldDice.map(die => {
        // if die.id matches the elements id which we clicked copy all properties of that element and rewrite the "isHeld" property with the inverse of the old "isHeld" property.
        // if instead of copying the whole elements properties we did die.isHeld = !die.isHeld, all other properties like id, etc would be erased due to being overwrite.
       return die.id === id ? {...die, isHeld: !die.isHeld} : die;
      })
    })

    // console.log(localStorage.getItem("top-score"));

  }

  // function to toggle theme (state) from false-true and vice-versa.
  function toggleTheme(){
    setTheme(prevTheme => !prevTheme);
  }

  // Generating die depending on number of array elements.
  const diceElements = dice.map(die => {
      return <Die value={die.value} isHeld={die.isHeld} key={die.id} css={theme} toggle={() => toggle(die.id)} />
  })


  // function for light and dark theme (container).
  // change background color depending on theme's boolean value.
  const contStyle = {
    backgroundColor : theme ? "#F5F5F5" : "#181818"
  }
  
  // function for light and dark theme (icon).
  // change color of text depending on theme's boolean value.
  const iconTheme = {
    color : theme ? "black" : "white"
  }


  return (
    <div className="App">

      {/* npm package called confetti is being implemented. */}
      {tenzies && <Confetti width={width} height={height}/>}

       <div className="container" style={contStyle}>

       <div className="rolls">

          <Roll content="Top-Score" currentRolls={topScore} />

          <i className="fa-solid fa-circle-half-stroke icons fa-2x" style={iconTheme} onClick={toggleTheme}></i> 

          <Roll content="Rolls" currentRolls={roll} />
          
       </div>

        <div className="header">

      {/* if tenzies (state) is true load winning component else normal header.  */}
          {tenzies ? 
          
          <Win css={theme} /> :

          <Header css={theme} />
        
        }

        </div>
            
            {/* calling the generated die's */}
            <div className="dices">
              {diceElements}
            </div>
            
            <div className="button">

              {

                // if tenzies (state) is false show reset and newgame button else newgame only.
                
                !tenzies 
                ?
                <>
               <Button function={resetDice} class="reset--btn" content="Reset" /> 

               <Button function={rollDice} content={tenzies ? "New Game" : "Roll"} />
                </>
                :
                <Button function={rollDice} content={tenzies ? "New Game" : "Roll"} />

              }

            </div>
        </div>
    </div>
  );
}
