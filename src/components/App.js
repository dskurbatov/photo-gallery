import React from 'react'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      index: 0,
      dragged: 0,
      isToggle: false,
      threshold: 1
    }
    this.container = null
    this.len = null
    this.windowWidth = null
    this.startPosition = null
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
    console.log(e.type)
    e.preventDefault()
    console.log(this.startPosition + ' before')
    if(this.startPosition || this.startPosition === 0){
      let dragged = Math.round(this.getX(e) - this.startPosition)
      console.log(dragged)
      this.setState({
        dragged: Math.round(this.getX(e) - this.startPosition)
      })
    } else {
      console.log(this.startPosition + ' after')
    }
  }

  lock(e){
    console.log('pointer-down ', e.type)
    this.startPosition = this.getX(e)
    return this.setState({
      isToggle: false,
      threshold: 1
    })
  }

  getX(e){
    return e.changedTouches ? e.changedTouches[0].clientX : e.clientX
  }

  move(e){
    console.log(e.type + ' up')
    if(this.startPosition || this.startPosition === 0) {
      let diff = this.getX(e) - this.startPosition,
          direction = Math.sign(diff), // direction could be -1 moving to the right 1 moving to the left and 0 stay where you are
          index = this.state.index,
          threshold = +(direction * diff / this.windowWidth).toFixed(2)
      
      if((index > 0 || direction < 0) && (index < this.len - 1 || direction > 0) && threshold > 0.2){
        index -= direction
        threshold = 1 - threshold
      }

      this.setState({
        index,
        dragged: 0,
        threshold,
        isToggle: true
      })
      this.startPosition = null
      return
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