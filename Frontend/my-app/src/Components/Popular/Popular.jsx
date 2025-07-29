import React from 'react'
import './Popular.css'; // Assuming you have a CSS file for styling
// import data_products from '../Assets/data'; // Adjust the path as necessary
import Item from '../Item/Item'; // Adjust the path as necessary
const Popular = () => {
    const [popularProducts, setPopularProducts] = React.useState([]);
    React.useEffect(() => {
        const fetchPopularProducts = async () => {
            const response = await fetch('http://localhost:4000/popularinwomen');
            const data = await response.json();
            setPopularProducts(data);
        };
        fetchPopularProducts();
    }, []);
  return (
   <div className="popular">
    <h1>Popular Products in Women</h1>
    <hr />
    <div className="popular-item">
        {
            popularProducts.map((item,i) => {
                return <Item 
                    key={i}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    new_price={item.new_price}
                    old_price={item.old_price}
                />
            })
        }
    </div>
   </div>
  )
}

export default Popular
