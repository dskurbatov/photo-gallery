import React from 'react'
import { Z_DEFAULT_STRATEGY } from 'zlib';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      index: 0,
      dragged: 0,
      isToggle: false,
      threshold: 1,
      start: null,
      isLocked: false
    }
    this.container = null
    this.len = null
    this.windowWidth = null
    this.onClick = this.onClick.bind(this)
    this.lock = this.lock.bind(this)
    this.move = this.move.bind(this)
    this.getX = this.getX.bind(this)
    this.drag = this.drag.bind(this)
  }

  componentDidMount(){
    this.container = document.querySelector('.container')
    this.len = this.container.children.length
    this.getSize()

    this.container.style.setProperty('--numOfImages', this.len)
    window.addEventListener('resize', this.getSize, false)
  }

  componentDidUpdate(){
    this.container.style.setProperty('--idx', this.state.index)
    this.container.style.setProperty('--threshold', this.state.threshold)
    this.container.style.setProperty('--dragged', `${this.state.dragged}px`)
    this.container.classList.toggle('slide', this.state.isToggle)
  }

  onClick(direction){
    return (e) => {
      let index = this.state.index + direction
      if(index > -1 && index < this.len){
        this.setState({
          index,
          threshold: 1,
          isToggle: true
        })
      } 
    }
  }

  getSize(e){
    this.windowWidth = window.innerWidth
  }

  drag(e){
    e.preventDefault()
    const { isLocked, start } = this.state
    if(isLocked){
      this.setState({
        dragged: Math.round(this.getX(e) - start)
      })
    }
    return
  }

  lock(e){
    return this.setState({
      isToggle: false,
      threshold: 1,
      start: this.getX(e),
      isLocked: true
    })
  }

  getX(e){
    return e.clientX
  }

  move(e){
    const { isLocked, start, index } = this.state
    if(isLocked) {
      let diff = this.getX(e) - start,
          direction = Math.sign(diff), // direction could be -1 moving to the right 1 moving to the left and 0 stay where you are
          currIndex = index,
          threshold = +(direction * diff / this.windowWidth).toFixed(2)
      
      if((currIndex > 0 || direction < 0) && (currIndex < this.len - 1 || direction > 0) && threshold > 0.2){
        currIndex -= direction
        threshold = 1 - threshold
      }

      return this.setState({
        index: currIndex,
        dragged: 0,
        threshold,
        isToggle: true,
        start: null,
        isLocked: false
      })
    }
  }

  render(){
    const { images } = this.props
    return (
      <div className="wrapper">
        <div className="container"
            onPointerDown={this.lock}
            onPointerMove={this.drag}
            onPointerUp={this.move}
        >
          {images.map((image, idx) => {
            return (<figure key={idx}>
              <img src={image.url} alt={`image ${idx + 1}`} />
              <figcaption>{image.caption}</figcaption>
            </figure>)
          })}
        </div>
        <button className="next"
                onClick={this.onClick(1)}
        ></button>
        <button className="prev"
                onClick={this.onClick(-1)}
        ></button>
      </div>
    )
  }
}

export default App