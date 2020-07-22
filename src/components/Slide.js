import React from 'react'
import { Slide } from 'react-slideshow-image'
import '../App.css'
import 'react-slideshow-image/dist/styles.css'

const proprietes = {
  duration: 4000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true
}

const SlideShow = () => {
  return (

    <div className="slide-container">
      <Slide {...proprietes}>
        <div className="each-slide">
          <div>
            <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/sr_5_13.7.2020.png" alt="img1" style={{width: 100 + '%'}}/>
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/sound_x_18.7.2020.jpg" alt="img2" style={{width: 100 + '%'}}/>
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/Star4_9.7.2020.png" alt="img3" style={{width: 100 + '%'}}/>
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/Realme_c11_8.7.png" alt="img4" style={{width: 100 + '%'}}/>
          </div>
        </div>
  
       
      </Slide>
    </div>


  )
}
export default SlideShow