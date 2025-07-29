// import { set } from "mongoose";
import React from "react";
import { createContext } from "react";
import { useEffect } from "react";

// import all_products from "../Components/Assets/all_product"; // Adjust the path as necessary
// import { getDefaultCart } from "../Components/Assets/cart";





export const ShopContext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < 301; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {

  const [all_products, setAll_Products] = React.useState([]);
  const [cartItems, setCartItems] = React.useState(getDefaultCart());
  useEffect(() => {
    
      fetch("http://localhost:4000/allproducts")
     .then((response) => response.json())
      .then((data) => setAll_Products(data));

       if(localStorage.getItem('token')){
          fetch('http://localhost:4000/getcart', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'token': `${localStorage.getItem('token')}`,
          },
          body:"",
        })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
        }
  }, []);

   const addToCart = (itemId) => {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      if(localStorage.getItem('token')){
        fetch('http://localhost:4000/addtocart', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'token': `${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({"itemId": itemId })
        })
        .then((response) => response.json())
        .then((data) => console.log(data));
      }
    };
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
       

      if (localStorage.getItem('token')) {
        fetch('http://localhost:4000/removefromcart', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'token': `${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({"itemId": itemId })
        })
        .then((response) => response.json())
        .then((data) => console.log(data));
      }
   };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_products.find((product) => product.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  }
  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };
  const contextValue = { getTotalCartAmount, getTotalCartItems, all_products, cartItems, setCartItems, addToCart, removeFromCart };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
     </ShopContext.Provider>
   );
};


export default ShopContextProvider;
