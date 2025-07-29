import React from 'react'
import './DescriptionBox.css'; // Assuming you have a CSS file for styling
const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
             <div className="descriptionbox-nav-box fade">Reviews(122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>An ecommerce website is an online platform that facilitates buying and selling of goods and services over the internet.</p>
            <p>It provides a virtual storefront where customers can browse products, add them to a cart, and complete transactions securely</p>
        </div>
    </div>
  )
}

export default DescriptionBox
