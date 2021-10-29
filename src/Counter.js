import React, { Component } from "react"
import { ThemeContext } from "./App"

export default class Counter extends Component {

    constructor(props){
        super(props)

        this.state = {
            count: props.initialCount
        }
    }

  render() {
    return (
      <ThemeContext.Consumer>
        {style => (
          <div>
                <button style={style} className="btn" onClick={()=> this.changeCount(-1)}>-</button>
              <span>{this.state.count}</span>
                <button style={style} className="btn" onClick={()=>{this.changeCount(1)}}>+</button>
        </div>
        )}
      </ThemeContext.Consumer>
    )
  }

  changeCount(amount){
      this.setState(prevState => {
        return  { count: prevState.count + amount}
      })
      
  }
}

/* changeCount(amount){
    //amount would first be 0

    this.setState({count:0 + 1})
    this.setState({cont: 0 + 1})
} */ //this is the reason because setState is asynchronous function and it takes first given amount in both cases
    // to solve that problem i wrote it other way using prevState
    // if using prevState, we have to use setState as a function version, if we do it without we can use normal version