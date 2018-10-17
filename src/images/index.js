import image1 from './image2.jpeg'
import image2 from './image3.jpg'
import image3 from './image4.jpg'

class Image{
  constructor(url="", caption=""){
    this.url = url
    this.caption = caption
  }
}

const images = [image1, image2, image3].map((url, idx) => {
  return new Image(url, `image ${idx}`)
})

export default images