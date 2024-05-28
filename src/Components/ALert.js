import React from "react";

function ALert(props){
  const capitalize=word=>{
    if(word==="Danger"){
      word="Error"
    }
    const lower=word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
    <div style={{height: '50px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dissmisible fade show`} role="alert">
        <strong>{capitalize(props.alert.type)}</strong>:{props.alert.msg}
        </div>}
    </div>
  )
}


export default ALert;
