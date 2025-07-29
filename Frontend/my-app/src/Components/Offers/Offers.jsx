import React from 'react'
import exclusive_image from '../Assets/exclusive_image.png'; // Adjust the path as necessary
import './Offers.css'; // Assuming you have a CSS file for styling

const Offers = () => {
  return (
       <div className="offers">
        <div className="offer-left">
            <h1>Exclusive Offers</h1>
            <h1>Offers for You  </h1>
            <p>Only on best sellers products</p>
            <button>Check Now</button>
        </div>
        <div className="offer-right">
            <img src={exclusive_image} alt="" />
            </div>
       </div>
  )
}

export default Offers
