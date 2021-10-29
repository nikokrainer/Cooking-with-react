import React, { useState, useContext } from "react"
import { ThemeContext } from "./App"

export default function CounterHooks({ initialCount }) {
  //when we have simple props (props) we can deconstruct it like this: ({initialCount}) and later use it withous props.initialCount but with just initialCount

  const [count, setCount] = useState(initialCount) //first value is actual state, and the second value is function that let's us set that state
                                                                // we don't have to use whole object as a state
const style = useContext(ThemeContext)
  return (
    <div>
        <button style={style} onClick = {()=>setCount(prevCount => prevCount - 1)}>-</button>
        <span>{count}</span>
        <button style={style} onClick = {()=>setCount(prevCount => prevCount + 1)}>+</button>
    </div>
  )
}
