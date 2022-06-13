import { render } from 'react-dom';

const {Search} = (await import('app1/search'));

export default function SearchHome(props){
    return(
        <>
        <Search />
        </>
    )
}