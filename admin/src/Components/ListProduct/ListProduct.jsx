import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const resp = await fetch('http://localhost:4000/allproducts');
      const data = await resp.json();
      setAllProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
     await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id }),
    });
    await fetchInfo();
  };  
  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Category</p>
        <p>New Price</p>
        <p>Old Price</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, i) => {
          return (
           <> <div key={i} className="listproduct-format-main listproduct-formate">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>{product.category}</p>
              <p>{product.new_price}</p>
              <p>{product.old_price}</p>
              <img onClick={() => remove_product(product.id)} src={cross_icon} alt="Remove" className="listproduct-remove-icon" />
            </div>
            <hr />
          </>
          )
        })}
      </div>
    </div>
  );
};

export default ListProduct;
