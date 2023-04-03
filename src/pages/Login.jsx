import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import Meta from '../components/Meta'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const authHeaderToken = window.btoa(`${username}:${password}`);
    fetch('http://localhost:8080/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authHeaderToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      onLogin(data.token, data.role);
      navigate('/');
    })
    .catch(error => {
      alert('Sign in failed, please try again');
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <Meta title={'Login'}/>
      <Header head={'Please sign in to continue'}/>

      <form onSubmit={handleSubmit} className="border rounded p-3 mx-auto" style={{ width: "50%" }}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" className="form-control" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
    </div>
  )
}

export default Login