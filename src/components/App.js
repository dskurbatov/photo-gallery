import React from 'react'

class App extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    console.log(this.props.images)
    return <h1>Hello From React</h1>
  }
}

export default App