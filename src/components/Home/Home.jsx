import { useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Cookies from 'js-cookie';
import './Home.css'

const Home = () => {
  const navigate = useNavigate();
  const handleFindJobs = () => {
    navigate('/jobs');
  }

  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken === undefined) {
    return <Navigate to='/login' />
  }
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1>Find The Job That Fits Your Life</h1>
        <div className='home-sub-container'>
          <p>Millions of people searching for jobs, salary information, company review. Find the job that fits your abilities and potential</p>
          <button type='button' className='find-jobs-button' onClick={handleFindJobs}>Find Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Home