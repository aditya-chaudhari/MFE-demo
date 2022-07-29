import React, { useState } from 'react';
import './search.scss';

export default function Search(props) {

  const [searchList, setSearchList] = useState([]);

  const getSearchResults = () => {
    const searchQuery = document.getElementById("searchId").value;
    if (!searchQuery || searchQuery.trim() === '')
    {
       alert("Domain name cannot be blank!")
       return;
    } 
    var regex = /(<([^>]+)>)/ig
    if (regex.test(searchQuery))
    {
       alert("Domain name cannot have HTML Tags!")
       return;
    } 
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
      <h4>Search for a Domain Name</h4>
      <div className="search-container justify-row-center">
        <input type="text" placeholder='testflix2022' className="search-input form-control" id="searchId" required/>   
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