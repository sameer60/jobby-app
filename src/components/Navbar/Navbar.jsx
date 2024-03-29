import { Link, NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const handleClickLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  return (
    <nav className='navbar-container'>
      <div className="logo-container">
        <Link to='/'>
          <img src='https://assets.ccbp.in/frontend/react-js/logo-img.png' alt='website-logo' />
        </Link>
      </div>
      <div className="nav-center-container">
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/jobs'>Jobs</NavLink>
      </div>
      <div className="logout-btn-container">
        <button type='button' onClick={handleClickLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar