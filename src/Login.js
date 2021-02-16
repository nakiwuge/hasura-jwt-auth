import React, { useState, useEffect } from "react";
import { useLazyQuery, gql } from '@apollo/client';
import { generateToken,generateKey } from "./jwt";
import  { Redirect } from 'react-router-dom'

const GET_USER = gql`
  query users($password:String,$username:String) {
    users(where: {password: {_eq: $password}, username: {_eq: $username}}) {
        id,
        username,
        role
      }
  }
`;

const Login = ()=>{
  const [ getUser, {loading, error, data} ] = useLazyQuery(GET_USER);
  const [errorMsg, setErrorMsg] =useState(null)
  
  useEffect(()=>{
   // generateKey()
  },[])

  useEffect(()=>{
      if(error){
        setErrorMsg(error.message)
      }

      if(data?.users && !data?.users?.length){
        setErrorMsg('User does not exist')
      }
  },
  [error,data?.users])

  const onClick=(e)=>{
    e.preventDefault();

     const loginData = { }
      const formData = new FormData(e.target);
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
        loginData[key]=value
    }

    getUser( {variables :{password:loginData.password, username:loginData.username}})
  }

  if (loading) return <p>Loading...</p>;

   if(data?.users?.length){
      const token = generateToken(data.users[0])
      localStorage.setItem('token',token)

      return <Redirect to='/token'  />   
   }

  return (
    <div>
      <form onSubmit={onClick}>
        
        <h3>Log in</h3>
        {errorMsg&& <p style={{color:'red'}}>Error :( {errorMsg}</p>}
        <div className="form-group">
          <label>Username</label>
          <input className="form-control" name="username" placeholder="Enter Username" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" className="form-control" placeholder="Enter password" />
        </div>
      <button type="submit"  className="btn btn-dark btn-lg btn-block">Sign in</button>
     </form>       
    </div>
    );
}
export default Login