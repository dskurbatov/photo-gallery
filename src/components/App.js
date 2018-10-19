import React from 'react'

class App extends React.Component{
  constructor(props){
    super(props)
    this.container = null
    this.len = null
    this.idx = 0
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
    this.container.addEventListener('mouseup', this.move, false)
    this.container.addEventListener('mousedown', this.lock, false)
    this.container.addEventListener('mousemove', this.drag, false)
    this.container.addEventListener('touchstart', this.lock, false)
    this.container.addEventListener('touchend', this.move, false)
    this.container.addEventListener('touchmove', this.drag, false)
    document.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', this.onClick, false)
    })
    window.addEventListener('resize', this.getSize, false)
  }

  onClick(e){
    //  - 1to the left and 1 to the right
    let direction = 1
    if(e.target.classList.contains('prev')){
      direction = - 1
    }

    this.idx += direction
    if(this.idx > -1 && this.idx < this.len){
      this.container.style.setProperty('--idx', this.idx)
      this.container.style.setProperty('--threshold', 1);
      this.container.classList.add('slide')
    } else {
      this.idx -= direction
    }
  }

  getSize(e){
    this.windowWidth = window.innerWidth
  }

  drag(e){
    e.preventDefault()

    if(this.startPosition || this.startPosition === 0){
      this.container.style.setProperty('--dragged', `${Math.round(this.getX(e) - this.startPosition)}px`)
    }
  }

  lock(e){
    this.startPosition = this.getX(e)
    if(this.container.classList.contains('slide')){
      this.container.classList.remove('slide')
    }
  }

  getX(e){
    return e.changedTouches ? e.changedTouches[0].clientX : e.clientX
  }

  move(e){
    if(this.startPosition || this.startPosition === 0) {
      let diff = this.getX(e) - this.startPosition
      // - 1 swipe right, 0 same, 1 swipe left
      let direction = Math.sign(diff),
      threshold = +(direction * diff / this.windowWidth).toFixed(2)
      if((this.idx > 0 || direction < 0) && (this.idx < this.len - 1 || direction > 0) && threshold > 0.2){
        this.container.style.setProperty('--idx', this.idx -= direction)
        threshold = 1 - threshold
      }
      this.container.style.setProperty('--dragged', '0px');
      this.container.style.setProperty('--threshold', threshold);
      if(!this.container.classList.contains('slide')){
        this.container.classList.add('slide')
      }
      this.startPosition = null
    }
  }

  render(){
    return (
      <div className="wrapper">
        <div className="container">
          {this.props.images.map((image, idx) => {
            return (<figure key={idx}>
              <img src={image.url} alt={`image ${idx + 1}`} />
              <figcaption>{image.caption}</figcaption>
            </figure>)
          })}
        </div>
        <button className="next"></button>
        <button className="prev"></button>
      </div>
    )
  }
}

export default App