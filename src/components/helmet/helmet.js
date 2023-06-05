import React from "react";
const Helmet=(props)=>{
document.title ='Makerly-'+ props.title
    return(
<div>{props.children}</div>
)
}
export default Helmet