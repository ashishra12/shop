import React from 'react'
import './NewCollections.css'; // Assuming you have a CSS file for styling
// import new_collections from '../Assets/new_collections'; // Adjust the path as necessary
import Item from '../Item/Item'; // Adjust the path as necessary
const NewCollections = () => {

  const [new_collections, setNew_Collections] = React.useState([]);

  React.useEffect(() => {
    const fetchNewCollections = async () => {
      const response = await fetch('http://localhost:4000/newcollections');
      const data = await response.json();
      setNew_Collections(data);
    };
    fetchNewCollections();
  }, []);

  return (

   <div className="new-collections">
     <h1>New Collections</h1>
     <hr />
     <div className="collections">
        {new_collections.map((item, i) => {
             return <Item 
                    key={i}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    new_price={item.new_price}
                    old_price={item.old_price}
                />
            })}
     </div>
   </div>
  )
}

export default NewCollections
