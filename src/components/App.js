import React from 'react'

class App extends React.Component{
  constructor(props){
    super(props)
    this.container = null
    this.len = null
    this.idx = 0
    this.startPosition = null
    this.onClickNext = this.onClickNext.bind(this)
    this.onClickPrev = this.onClickPrev.bind(this)
    this.lock = this.lock.bind(this)
    this.move = this.move.bind(this)
    this.getX = this.getX.bind(this)
    this.drag = this.drag.bind(this)
  }

  componentDidMount(){
    this.container = document.querySelector('.container')
    this.len = this.container.children.length

    this.container.style.setProperty('--numOfImages', this.len)
    this.container.addEventListener('mouseup', this.move, false)
    this.container.addEventListener('mousedown', this.lock, false)
    this.container.addEventListener('mousemove', this.drag, false)
    this.container.addEventListener('touchstart', this.lock, false)
    this.container.addEventListener('touchend', this.move, false)
    this.container.addEventListener('touchmove', this.drag, false)
    document.querySelector('.next').addEventListener('click', this.onClickNext, false)
    document.querySelector('.prev').addEventListener('click', this.onClickPrev, false)
  }

  drag(e){
    e.preventDefault()

    if(this.startPosition || this.startPosition === 0){
      this.container.style.setProperty('--dragged', `${Math.round(this.getX(e) - this.startPosition)}px`)
    }
  }

  onClickNext(e){
    if(this.container.classList.contains('slide')){
      this.container.classList.remove('slide')
    }

    this.idx++
    if(this.idx < this.len){
      this.container.style.setProperty('--idx', this.idx)
      this.container.classList.add('slide')
    } else {
      this.idx = this.len - 1
    }
  }

  lock(e){
    this.startPosition = this.getX(e)
    if(this.container.classList.contains('slide')){
      this.container.classList.remove('slide')
    }
  }

  getX(e){
    return e.changedTouchs ? e.changedTouchs[0].clientX : e.clientX
  }

  move(e){
    if(this.startPosition || this.startPosition === 0) {
      let diff = this.getX(e) - this.startPosition
      // - 1 swipe right, 0 same, 1 swipe left
      let direction = Math.sign(diff)
      if((this.idx > 0 || direction < 0) && (this.idx < this.len - 1 || direction > 0)){
        this.container.style.setProperty('--idx', this.idx -= direction)
      }
      if(!this.container.classList.contains('slide')){
        this.container.classList.add('slide')
      }
      this.container.style.setProperty('--dragged', '0px');
      this.startPosition = null
    }
  }

  onClickPrev(e){
    if(this.container.classList.contains('slide')){
      this.container.classList.remove('slide')
    }

    this.idx--
    if(this.idx > -1){
      this.container.style.setProperty('--idx', this.idx)
      this.container.classList.add('slide')
    } else {
      this.idx = 0
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