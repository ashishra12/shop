import React from 'react'
import './CartItems.css'; // Assuming you have a CSS file for styling
import { useContext } from 'react';
import { ShopContext } from '../../Contexts/ShopContext'; // Import the ShopContext
import remove_icon from '../Assets/cart_cross_icon.png'; // Adjust the path as necessary

const CartItems = () => {
    const { getTotalCartAmount, all_products, cartItems , removeFromCart } = useContext(ShopContext);
  return (
 <div className="cartitems">
    <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
    </div>
    <hr />
    
        {
            all_products.map((product) => {
                if (cartItems[product.id] !== 0) {
                    return (
                        <div className="cartitems-format cartitems-format-main" key={product.id}>
                            <img src={product.image} alt={product.name} className='carticon-product-icon'/>
                            <p>{product.name}</p>
                            <p>${product.new_price}</p>
                            <button className="cartitems-quantity">{cartItems[product.id]}</button>
                           
                            <p>${(cartItems[product.id] * product.new_price).toFixed(2)}</p>
                            <img className='carticon-remove-icon' src={remove_icon} onClick={() => removeFromCart(product.id)} alt="" />
                        </div>
                    );
                }
                return null;
            })
            
        }
        <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                           </div>
                           <hr />
                            <div className="cartitems-total-item">
                            <p>Total</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                    </div>
                   <button>PROCEED TO CHECKOUT</button>

                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promocode ,Enter it here</p>
                    <div className="cartitem-promobox">
                        <input type="text" placeholder="Enter promocode" />
                        <button>Summit</button>
                    </div>
                </div>
            </div>
    </div>

  )
}

export default CartItems
