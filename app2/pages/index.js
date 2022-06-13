import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router'
import {Heading, Pane, Link, Paragraph, Code, Strong, UnorderedList, ListItem} from 'evergreen-ui'

// const add = React.lazy(()=>{import('app1/add')});
const add = (await import('app1/add')).default;
const {Page1} = (await import('app1/page1'));
const {Page2} = (await import('app3/page2'));

const {Search} = (await import('app1/search'));
const {Cart} = (await import('app3/cart'));
const {Billing} = (await import('app4/billing'));

export default function Home() {
  const router = useRouter()
  return (
    <div >

      <Head>
        <title>NextJS Micro Frontend</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </Head>

      <main >
        <Pane display="flex" alignContent="space-between" padding={16} paddingLeft={"58px"} paddingRight={"58px"} marginTop={"0%"} background="tint2" borderRadius={3} width={"100%"}>
          <Pane flex={1} alignSelf="flex-start" alignItems="center" display="flex">
            <Heading size={800}>Hello, World! (Container App-2)</Heading>
          </Pane>

          <Pane  alginSelf="flex-end" alignItems="center"  display="flex">
            <Link padding={4} target={'_blank'} href="http://localhost:3000/">App-1</Link>
            {/* <Link padding={4} href="/cart">App-2</Link>
            <Link padding={4} href="/cart">App-3</Link> */}
            <Link padding={4} target={'_blank'} href="/billing">App-4</Link>
            <h1>{}</h1>
          </Pane>
        </Pane>
        <Pane padding={16} marginLeft={'2.5%'} marginRight={'2.5%'}>
          {/* <h4>MFE (Container App-2)</h4> */}
          <div className='row main-container'>
              <div className='col-sm-6'>
                <Search />
              </div>
              <div className='col-sm-6'>
                {/* <Billing /> */}
                <Cart />
              </div>
          </div>
          {/* <h4>Utility functions</h4>
          <h2>
            {`Adding 2 and 3 =`} {add(2, 3)}
          </h2> */}
        </Pane>
      </main>
    </div>
  );
}
