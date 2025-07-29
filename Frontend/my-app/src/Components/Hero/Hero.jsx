import React from 'react'
import hand_icon from '../Assets/hand_icon.png'; // Adjust the path as necessary
import arrow_icon from '../Assets/arrow.png'; // Adjust the path as necessary
import hero_image from '../Assets/hero_image.png'; // Adjust the path as necessary
import './Hero.css'; // Assuming you have a CSS file for styling
const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h1>NEW ARRIVALS ONLY</h1>
        <div>
            <div className="hero-hand-icon">
                <p>new</p>
                <img src={hand_icon} alt="" />
            </div>
            <p>collection</p>
            <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  )
}

export default Hero
