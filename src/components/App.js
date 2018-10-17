import React from 'react'

class App extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="container">
        {this.props.images.map((image, idx) => {
          return (<figure key={idx}>
            <img src={image.url} alt={`image ${idx + 1}`} />
            <figcaption>{image.caption}</figcaption>
          </figure>)
        })}
      </div>
    )
  }
}

export default App