import React from 'react'
import './Footer.css'; // Assuming you have a CSS file for styling
import footer_logo from '../Assets/logo_big.png'; // Adjust the path as necessary
import instagram_icon from '../Assets/instagram_icon.png'; // Adjust the path as necessary
import pintester_icon from '../Assets/pintester_icon.png'; // Adjust the path as necessary
import whatsapp_icon from '../Assets/whatsapp_icon.png'; // Adjust the path as necessary
const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>Shopper</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Product</li>
            <li>Office</li>
            <li>Contact</li>
            <li>About</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icon-container">
                <img src={instagram_icon} alt="" />
            </div>
              <div className="footer-icon-container">
                <img src={pintester_icon} alt="" />
            </div>
              <div className="footer-icon-container">
                <img src={whatsapp_icon} alt="" />
            </div>
            
        </div>
        <div className="footer-copyright">
            <hr />
            <p>© 2025 Shopper. All rights reserved.</p>
           
        </div>
        
    </div>
  )
}

export default Footer
