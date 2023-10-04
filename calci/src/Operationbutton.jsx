import { ACTIONS } from "./calculator"

export default function Operation_button({dispatch,operation}){
    return <button onClick={()=>dispatch({type:ACTIONS.CHOOSE_OPERATION,payload:{operation}})}>
        {operation}
    </button>
}