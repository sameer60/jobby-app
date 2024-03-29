import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Navigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [erroeMessage, setErrorMessage] = useState('');

  const navigate = useNavigate()

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const renderUsername = () => (
    <div className="login-input-container">
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        id='username'
        placeholder='Enter Username'
        value={username}
        onChange={handleUsername}
      />
    </div>
  )

  const renderPassword = () => (
    <div className="login-input-container">
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        id='password'
        placeholder='Enter Password'
        value={password}
        onChange={handlePassword}
      />
    </div>
  )

  const renderErrorMsg = () => (
    <p className='login-error-msg'>{erroeMessage}</p>
  )

  const onSubmitSuccess = (jwt_token) => {
    Cookies.set("jwt_token", jwt_token, { expires: 30 });
    setShowErrorMessage(false);
    navigate('/');
  };

  const onSubmitFailure = (erroeMessage) => {
    setShowErrorMessage(true);
    setErrorMessage(erroeMessage);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const url = 'https://apis.ccbp.in/login';
    const userDetails = { username, password };
    const option = {
      method: "POST",
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option);
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    }
    else {
      onSubmitFailure(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken !== undefined) {
    return <Navigate to="/" />
  }
  else {
    return (
      <div className='outer-container'>
        <form className="login-container" onSubmit={handleLoginSubmit}>
          <div className="website-logo-container">
            <img src='https://assets.ccbp.in/frontend/react-js/logo-img.png' alt='website-logo' />
          </div>
          {renderUsername()}
          {renderPassword()}
          <button type='submit' className='login-btn'>Login</button>
          {showErrorMessage && renderErrorMsg()}
        </form>
      </div>
    )
  }
}

export default Login