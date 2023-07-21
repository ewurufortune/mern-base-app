import serialize from "serialize-javascript";
import React, { useState } from "react";
import { Box, useMediaQuery, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setName, setFirstname, setSavegame, setTraits,setButton1Text, setUserResponse,setButton2Text,setButton1TextValue,setButton2TextValue,setActionDescription,setExecuteAction,setShowOptions,setShowDescription,setDecisionText1,setDecisionText2,setShowDecisionText,setSelectedDecision,setShowNextActivityButton,setShowNextWeekButton,setLastActivity} from "state";
//button2Text is represented as buttonText2 in the reducer Slice




export default function UserResponseButton({ initialButtonText, onResponse }) {
  const dispatch=useDispatch()
  
  const [showInput, setShowInput] = useState(false);

  const button1Text = useSelector((state) => state.buttonText);
  const button1Value = useSelector((state) => state.buttonTextValue);
  const button2Value = useSelector((state) => state.buttonText2Value);
  const button2Text = useSelector((state) => state.buttonText2);
  const userResponse = useSelector((state) => state.userResponse);
const actionDescription = useSelector((state) => state.actionDescription);
const executeAction = useSelector((state) => state.executeAction);
const showOptions = useSelector((state) => state.showOptions);
const decisionText1 = useSelector((state) => state.decisionText1);
const decisionText2 = useSelector((state) => state.decisionText2);
const showDescription = useSelector((state) => state.showDescription);


  const handleClick = (value,decisionText) => {
    dispatch(setShowOptions({showOptions: false}))
    dispatch(setShowDescription({showDescription: false}))
    setShowInput(true);
   
    dispatch(setUserResponse({ userResponse: value }));
    dispatch(setSelectedDecision({ selectedDecision: decisionText }));
    dispatch(setShowDecisionText({ showDecisionText: true }));
    function isSerializedFunction(value) {
      // Define a regular expression pattern for a serialized function
      const functionPattern = /\bfunction\b/;
    
      // Use the test method of the regular expression to check for a match
      return functionPattern.test(value);
    }

    const isSerialized = isSerializedFunction(value);
    if (isSerialized) {
      const deserializedFunction = eval("(" + value + ")");
      // Now you have the deserialized function
         // Perform some action with the user response
      deserializedFunction(); 
      
    } else {
      // It's a normal string, not a serialized function
      console.log(value);
    }
    // onResponse(userResponse);
  };

  return (
    <div>
      {showOptions ? (
        <div>
       
        <p>title</p>
          <button onClick={() => handleClick(button1Value,decisionText1)}>{button1Text}</button>
          <button onClick={() => handleClick(button2Value,decisionText2)}>{button2Text}</button>
        </div>
      ) : (
        <p>Waiting for response...</p>
      )}
      <br/>
    </div>
  );
}

