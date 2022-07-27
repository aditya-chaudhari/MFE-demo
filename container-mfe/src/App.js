import React, { Suspense, lazy, useState, useEffect } from 'react';
import {Heading, Pane, Link} from 'evergreen-ui'

const SearchComponent = lazy(() => import('domainMFE/search'));
const CartComponent = lazy(() => import('cartMFE/cart'));

export default function App(){
  const [ cartDetails, setCartDetails ] = useState(null);
  const [ paymentSuccess, setPaymentSuccess] = useState(null);
  useEffect(() => {
    const checkoutFunc = async (e) => {
      setCartDetails(e.detail);
      
      const sendReceivedMessageToAllIframes = event => {
        document
          .querySelectorAll("iframe")
          .forEach(iframe => iframe.contentWindow.postMessage(event.data, "*"));
      };
      window.addEventListener("message", sendReceivedMessageToAllIframes);

      setTimeout(()=>{
        window.parent.postMessage({ channel: "PARENT_TO_CHILD",details: e.detail}, "http://container-mfe.com");
      }, 1000);
    };
    window.addEventListener('CHECKOUT', (e) => checkoutFunc(e));
    window.addEventListener('message', function (e) {
      if (e.data.channel === "CHILD_TO_PARENT") {
        setPaymentSuccess(e.data.paymentSuccess);
      }
    });
    return () => {
      window.removeEventListener('CHECKOUT', (e) => { checkoutFunc(e) })
    }
  }, []);
  return <>
  <Pane display="flex" alignContent="space-between" padding={16} paddingLeft={"58px"} paddingRight={"58px"} marginTop={"0%"} background="tint2" borderRadius={3} width={"100%"}>
      <Pane flex={1} alignSelf="flex-start" alignItems="center" display="flex">
        <Heading size={800}>Hello, World!</Heading>
      </Pane>

      <Pane  alginSelf="flex-end" alignItems="center"  display="flex">
        <Link padding={4} target={'_blank'} href="http://domain-mfe.com/">Domain</Link>
        {/* <Link padding={4} href="/cart">App-2</Link>
        <Link padding={4} href="/cart">App-3</Link> */}
        <Link padding={4} target={'_blank'} href="/billing">Login</Link>
        <h1>{}</h1>
      </Pane>
    </Pane>

    <Pane padding={16} marginLeft={'2.5%'} marginRight={'2.5%'}>
      <div className='row main-container'>
      {!paymentSuccess ? !cartDetails ? <>
        <div className='col-sm-6'>
          <Suspense fallback={()=> <h1>loading...</h1>}>
            <SearchComponent />
          </Suspense>
        </div>
        <div className='col-sm-6'>
          <Suspense fallback={()=> <h1>loading...</h1>}>
            <CartComponent />
          </Suspense>
        </div>
        </> : <iframe id="my-iframe" src="http://payment-mfe.com/" height="740px" style={{border: "0px"}} width="100%" title="checkout page"></iframe>
        :null }
        {paymentSuccess && <div>Payment Successful</div>}
      </div>
    </Pane> 
  </>;
}