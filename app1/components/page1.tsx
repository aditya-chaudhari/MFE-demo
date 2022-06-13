import React, {FunctionComponent} from 'react'

export const Page1: FunctionComponent = (props) => {
  return (
    <>
    {console.log("---",props)}
    <h3>This is page 1</h3>
    </>
  );
};