import React, { useEffect, useState, useRef, FunctionComponent } from 'react';
// import styles from '../styles/Search.module.css';

export function Search(props) {
  useEffect(() => {
    
  }, []);

  const [searchList, setSearchList] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const getSearchResults = () => {
    const searchQuery = document.getElementById("searchId").value;
    fetch(`https://registration.bluehost.com/domains/search/${searchQuery}.com?suggestions=100&propertyID=52`)
    .then(res => res.json())
    .then(
      (response) => {
        setSearchList(response.results);
      },
      (error) => {
        console.log("error",error);
      }
    )
  }

  const addItemInCart = (cartItem) => {
    const customEvent = new CustomEvent('ADD_CART_ITEM', { detail: cartItem });
    window.dispatchEvent(customEvent)
  }

  const removeItemFromCart = (id) => {
    const customEvent = new CustomEvent('REMOVE_CART_ITEM', { detail: id });
    window.dispatchEvent(customEvent)
  }

  return (
    <>
      <h4 className='cart'>Search (Container App-1)</h4>
      <div className="search-container justify-row-center">
        <input type="text" placeholder='Search...' className="search-input form-control" id="searchId" />   
        <button type="button" onClick={()=>{getSearchResults()}} className="btn btn-success">Search</button>
      </div>
      <div className='search-list'>
       <ul className='list-group'>
        {searchList.map((item, i) => (
          <li className="list-group-item" key={item.product_id+i}>
            {item.domainInfo.domain}
            <button onClick={()=>{addItemInCart(item)}} style={{fontSize:'12px', float: 'right'}}><i className="fa fa-plus"></i></button>
            <button onClick={()=>{removeItemFromCart(item.product_id)}} style={{fontSize:'12px', marginRight: '10px', float: 'right'}}><i className="fa fa-minus"></i></button>
          </li>
        ))}
      </ul>
     </div>
    </>
  );
}