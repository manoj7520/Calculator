import React, {  useReducer} from 'react'
import './calsi.css';
import DigitButton from './Digitbutton';
import Operation_button from './Operationbutton';
export const ACTIONS ={
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state,{type,payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(payload.digit==="0" && state.currentOperand==="0"  ||  payload.digit==="00" && state.currentOperand==="00")
        return state
      if( payload.digit==="." && state.currentOperand.includes("."))
        return state
      return{
        ...state,
        currentOperand:`${state.currentOperand || ""}${payload.digit}`,
            }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null){
        return state
      }  
      if(state.currentOperand == null){
        return{
          ...state,
          operation:payload.operation
        }
      }
      if(state.previousOperand ==null){
      return {
      ...state,
      operation:payload.operation,
      previousOperand:state.currentOperand,
      currentOperand:null,
      }
      }
      return{
        ...state,
        previousOperand:evaluate(state),
        operation:payload.operation,
        currentOperand:null
      }
    case ACTIONS.EVALUATE:
      if(state.currentOperand == null || state.previousOperand == null || state.operation == null){
        return state
      }  
      return {
        ...state,
        previousOperand:null,
        operation:null,
        currentOperand:evaluate(state)
      }
    case ACTIONS.DELETE_DIGIT:
      if(state.currentOperand==null){
        return state
      }  
      if(state.currentOperand.length === 1){
        return {...state, currentOperand:null}
      }
      return{
        ...state,
        currentOperand:state.currentOperand.slice(0,-1)
      }
  }
}

    function evaluate({currentOperand,previousOperand,operation}){
      const prev=parseFloat(previousOperand)
      const current=parseFloat(currentOperand)
      if(isNaN(prev) || isNaN(current)) return ""
      let computation =""
      switch(operation){
        case "+":
          computation =prev + current
          break
        case "-":
          computation =prev - current
          break
        case "/":
          computation =prev / current
          break
        case "x":
        computation =prev * current
        break
        case "%":
        computation =prev % current
        break
    }
    return computation.toString()
  }

function CAlsi() {
  const backspace="<="
  
  const[{currentOperand,previousOperand,operation},dispatch]=useReducer(reducer,{})

  return (
    <div id='main'>
      <div id='div1'>
      </div>
      <div id='div2'>
        <div id='previous_digit'>{previousOperand}{operation}</div>
        <div id='current_digit'>{currentOperand}</div>
        <div id='row1'>
          
        <button onClick={()=>dispatch({ type:ACTIONS.CLEAR})} >AC</button>
        <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>{backspace}</button>
        <Operation_button operation="%" dispatch={dispatch}/>
        <Operation_button operation="/" dispatch={dispatch}/>
        </div>
        <div id='row2'>
       <DigitButton digit="7" dispatch={dispatch}/>
       <DigitButton digit="8" dispatch={dispatch}/>
       <DigitButton digit="9" dispatch={dispatch}/>
       <Operation_button operation="x" dispatch={dispatch}/>
        </div>
        <div id='row3'>
        <DigitButton digit="4" dispatch={dispatch}/>
        <DigitButton digit="5" dispatch={dispatch}/>
        <DigitButton digit="6" dispatch={dispatch}/>
        <Operation_button operation="-" dispatch={dispatch}/>
        </div>
        <div id='row4'>
        <DigitButton digit="1" dispatch={dispatch}/>
        <DigitButton digit="2" dispatch={dispatch}/>
        <DigitButton digit="3" dispatch={dispatch}/>
        <Operation_button operation="+" dispatch={dispatch}/>
        </div>
        <div id='row5'>
        <DigitButton digit="00" dispatch={dispatch}/>
        <DigitButton digit="0" dispatch={dispatch}/>
        <DigitButton digit="." dispatch={dispatch}/>
        <button onClick={()=>dispatch({type: ACTIONS.EVALUATE})}>=</button>
        </div>
      </div>
      <div id='div3'>

      </div>
    </div>
  )
}

export default CAlsi