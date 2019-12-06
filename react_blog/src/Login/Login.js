import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './Login.css'

function Login() {

  
  function handleLogin() {
    return axios.post('http://nodeblog.josephjin.win/login', params)
  }
  
  let [params, setParams] = useState({
    username: '',
    password: ''
  })
  // let showError = 'error-display'

  let [showError, setShowError] = useState('error-display')

  function handleClick(event) {
    event.preventDefault()
    console.dir(params)
    if (params.username.length && params.password.length) {

      handleLogin().then(res => {
        console.log(res)
        let result = res.data
        if(result.error) {
          console.log(result.message)
        } else {
          console.log(result.message);
        }
      }).catch(err => {
        console.log('err')
      })
      
    } else {
      console.log('Error message')
      setShowError('error-display active')
    }

  }
  function handleInputChange(event) {

    const name = event.target.name
    const value = event.target.value
    console.log(name, ": ", value)

    // params[name] = value
    setParams(Object.assign(params, {
      [name]: value
    }))
    setShowError('error-display')
  }

  return (
    <div>
      <form name="login">
        <input name="username" onChange={handleInputChange} />
        <input name="password" type="password" onChange={handleInputChange} autoComplete="off" />
        <button onClick={handleClick}>Login</button>
        <p className={showError}>
          Username and password cannot be empty.
        </p>
      </form>
    </div>

  );
}

export default Login
