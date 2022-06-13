import { render } from 'react-dom';

const {Cart} = (await import('app3/cart'));

export default function CartHome(props){
    return(
        <>
        <Cart />
        </>
    )
}