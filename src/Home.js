import React from "react";

const Home = ()=>{
  return (
    <div >
      <h3>JWT Token</h3>
      <div style={{background:'#E8E6E6', padding:"5px" ,width:'100%',height:"auto",  wordWrap: 'break-word'}}>
        {localStorage.getItem('token')}
      </div>
    </div>
)}

export default Home