import React from 'react'

class App extends React.Component{
  constructor(props){
    super(props)
    this.container = null
    this.len = null
    this.idx = 0
    this.onClickNext = this.onClickNext.bind(this)
    this.onClickPrev = this.onClickPrev.bind(this)
  }

  componentDidMount(){
    this.container = document.querySelector('.container')
    this.len = this.container.children.length

    this.container.style.setProperty('--n', this.len)
    document.querySelector('.next').addEventListener('click', this.onClickNext, false)
    document.querySelector('.prev').addEventListener('click', this.onClickPrev, false)
  }

  onClickNext(e){
    if(this.container.classList.contains('slide')){
      this.container.classList.remove('slide')
    }

    this.idx++
    if(this.idx < this.len){
      this.container.style.setProperty('--i', this.idx)
      this.container.classList.add('slide')
    } else {
      this.idx = this.len - 1
    }
  }

  onClickPrev(e){
    if(this.container.classList.contains('slide')){
      this.container.classList.remove('slide')
    }

    this.idx--
    if(this.idx > -1){
      this.container.style.setProperty('--i', this.idx)
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