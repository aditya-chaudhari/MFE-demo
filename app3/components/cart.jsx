import React, { useEffect, useState, useRef, FunctionComponent } from 'react';

export function Cart(props) {

const [cart, setCart] = useState([]);
const inputElement = useRef();

const addItemInCart=(event)=>{
    const newCartItem = event.detail;
    const cartArr = cart || [];
    cartArr.push(newCartItem);
    setCart([...cartArr]);
  }

const removeItemFromCart=(event)=>{
  const id = event.detail;
  const cartArr = cart || [];
  (cartArr || []).forEach((data, i)=>{
    if(data.product_id === id){
      cartArr.splice(i, 1); 
      setCart([...cartArr]);
    }
  })
}

useEffect(() => {
    window.addEventListener('ADD_CART_ITEM', (e)=>{addItemInCart(e)});
    window.addEventListener('REMOVE_CART_ITEM', (e)=>{removeItemFromCart(e)});

    return () => {
      window.removeEventListener('ADD_CART_ITEM', (e)=>{addItemInCart(e)})
      window.removeEventListener('REMOVE_CART_ITEM', (e)=>{removeItemFromCart(e)})
    }
  }, []);

  return (
    <>
    {cart.length > 0 && (
      <>
      <h4 className='cart'>Cart (Container App-3)</h4>
      <ul className='list-group'>
        {cart.map(data => (
          <li className="list-group-item" key={data.product_id} ref={inputElement} >
            {data.domainInfo.domain}
          </li>
        ))}
      </ul>
      {cart&& <button onClick={()=>{
        const customEvent = new CustomEvent('CHECKOUT', {detail: cart });
        window.dispatchEvent(customEvent)
      }}> Checkout</button>}
      </>
      )}
    </>
  );
}