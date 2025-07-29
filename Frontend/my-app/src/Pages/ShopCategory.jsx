import React from 'react'
import { useContext } from 'react';
import './CSS/ShopCategory.css'; // Assuming you have a CSS file for styling
import { ShopContext } from '../Contexts/ShopContext'; // Adjust the path as necessary
import dropdown_icon from '../Components/Assets/dropdown_icon.png'; // Adjust the path as necessary
import Item from '../Components/Item/Item.jsx';

const ShopCategory = (props) => {
  const { all_products } =useContext(ShopContext);
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 136 products
        </p>
        <div className="shopcategory-sort">
          SORT BY <img src={dropdown_icon} alt="Sort" />
        </div>

      </div>
      <div className="shopcategory-products">
        {
          all_products.map((item, i) => {
            if(props.category===item.category){
              return <Item 
                    key={i}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    new_price={item.new_price}
                    old_price={item.old_price}
                />
            }
            else {
              return null;
            }
          })
        }

      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory
