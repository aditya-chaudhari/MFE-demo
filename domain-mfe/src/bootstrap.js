import React from 'react';
import ReactDOM from "react-dom";
import Search from "./search"
import {Heading, Pane, Link} from 'evergreen-ui'

ReactDOM.render(
  <>
  <Pane display="flex" alignContent="space-between" padding={16} paddingLeft={"58px"} paddingRight={"58px"} marginTop={"0%"} background="tint2" borderRadius={3} width={"100%"}>
      <Pane flex={1} alignSelf="flex-start" alignItems="center" display="flex">
        <Heading size={800}>TestFlix 2022 - Test Dominance in the era of Micro Frontends</Heading>
      </Pane>

      <Pane  alginSelf="flex-end" alignItems="center"  display="flex">
        <Link padding={4} href="http://container-mfe.com/">Home</Link>
        <Link padding={4} target={'_blank'} href="http://domain-mfe.com/">Domain</Link>
        {/* <Link padding={4} href="/cart">App-2</Link>
        <Link padding={4} href="/cart">App-3</Link> */}
        <Link padding={4} target={'_blank'} href="/billing">Login</Link>
        <h1>{}</h1>
      </Pane>
    </Pane>

    <Pane padding={16} marginLeft={'2.5%'} marginRight={'2.5%'}>
      <div className='row main-container'>
        <Search/>
      </div>
    </Pane>
    </>,
  document.getElementById("root"));
