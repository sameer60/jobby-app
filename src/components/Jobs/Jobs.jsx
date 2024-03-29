import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Navigate } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import Cookies from 'js-cookie';
import Navbar from '../Navbar/Navbar';
import JobItem from '../JobItem/JobItem';
import './Jobs.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
  {
    salaryRangeId: '',
    label: 'Clear Filter',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  noJobs: 'NO_JOBS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Jobs = () => {
  const [profileData, setProfileData] = useState({});
  const [jobList, setJobList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [activeEmploymentId, setActiveEmploymentId] = useState([]);
  const [activeSalaryRangeId, setActiveSalaryRangeId] = useState('');

  const getProfileData = async () => {
    const jwt_token = Cookies.get('jwt_token');
    const profileUrl = 'https://apis.ccbp.in/profile';
    const option = {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + jwt_token }
    }
    const response = await fetch(profileUrl, option);
    const data = await response.json();
    setProfileData(data.profile_details);
  };

  const onSucessJobFetch = (joblist) => {
    setJobList(joblist)
  };

  const onNoJobsFound = () => {
    return (
      <div className='no-jobs-found-main-container'>
        <img src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png" alt="no-jobs-found-img" />
        <h2 className='no-jobs-found-text'>No Jobs Found</h2>
        <p className='no-jobs-found-text'>Please try another keyword!!</p>
      </div>
    )
  }

  const getJobsList = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwt_token = Cookies.get('jwt_token');
    const activeEmploymentIdStr = activeEmploymentId.join(',')
    const profileUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentIdStr}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`;
    const option = {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + jwt_token }
    }
    const response = await fetch(profileUrl, option);
    const data = await response.json();
    if (response.ok === true) {
      if (data.jobs.length > 0) {
        onSucessJobFetch(data.jobs)
        setApiStatus(apiStatusConstants.success)
      }
      if (data.jobs.length === 0) {
        setApiStatus(apiStatusConstants.noJobs)
      }
    }
    else {
      setApiStatus(apiStatusConstants.failure)
    }
  };

  // everytime page loads
  useEffect(() => {
    getProfileData();
    getJobsList();
  }, [])

  //every time there is a change in the activeEmploymentId
  useEffect(() => {
    getJobsList();
  }, [activeEmploymentId, activeSalaryRangeId])

  // for searhing event
  useEffect(() => { getJobsList() }, [searchInput])

  const renderLoaderView = () => (
    <div className="loader-view">
      <ColorRing
        visible={true}
        height="40"
        width="40"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>
  );

  const renderProfile = () => (
    <div className="profile-details">
      <img src={profileData.profile_image_url} className='profile-img' />
      <p className='profile-name'>{profileData.name}</p>
      <p className='profile-bio'>{profileData.short_bio}</p>
    </div>
  )

  const onChangeEmploymentType = (employmentId) => {
    const findEmployId = activeEmploymentId.find(item => item === employmentId)
    if (findEmployId === undefined) {
      setActiveEmploymentId(prev => [...prev, employmentId])
    }
    else {
      const remainingEmploysId = activeEmploymentId.filter(item => item !== employmentId)
      setActiveEmploymentId([...remainingEmploysId]);
    }
  }

  const renderTypeOfEmployment = () => (
    <div className="filter-container">
      <p className='heading'>Type of Emplyment</p>
      {employmentTypesList.map((type) => (
        <div className='employment-container' key={type.employmentTypeId}>
          <input
            type='checkbox'
            id={type.employmentTypeId}
            onChange={() => onChangeEmploymentType(type.employmentTypeId)}
          />
          <label htmlFor={type.employmentTypeId}>{type.label}</label>
        </div>
      ))}
    </div>
  )

  const onChangeSalaryRange = (salaryRange) => {
    if (activeSalaryRangeId !== salaryRange) {
      setActiveSalaryRangeId(salaryRange);
    }
    else {
      setActiveSalaryRangeId('');
    }
  }

  const renderSalaryRange = () => (
    <div className="filter-container">
      <p className='heading'>Salary Range</p>
      {salaryRangesList.map((type) => (
        <div className='employment-container' key={type.salaryRangeId}>
          <input
            type='radio'
            id={type.salaryRangeId}
            onChange={() => onChangeSalaryRange(type.salaryRangeId)}
            value={type.salaryRangeId}
            name='salary-range'
          />
          <label htmlFor={type.salaryRangeId}>{type.label}</label>
        </div>
      ))}
    </div>
  )

  const handleSearch = (event) => (setSearch(event.target.value));

  const handleSearchClick = () => {
    setSearchInput(search);
  }

  const renderSearch = () => (
    <div className="search-container">
      <input type="search" value={search} onChange={handleSearch} />
      <button className='search-btn' onClick={handleSearchClick}>
        <BiSearchAlt />
      </button>
    </div>
  )

  const renderAllJobsView = () => (
    <>
      {jobList.map((job) => <JobItem
        key={job.id}
        logo={job.company_logo_url}
        employment_type={job.employment_type}
        id={job.id}
        job_description={job.job_description}
        location={job.location}
        package_per_annum={job.package_per_annum}
        rating={job.rating}
        title={job.title}
      />)}
    </>
  );

  const handleRetry = () => {
    getJobsList();
  };

  const renderFailureView = () => (
    <div className='failure-view-container'>
      <img src='https://assets.ccbp.in/frontend/react-js/failure-img.png' alt='failure-view' />
      <h3>Oops! Something went wrong.</h3>
      <p>We can not seem to find the page you are looking for.</p>
      <button type='button' className='retry-jobs-button' onClick={handleRetry}>Retry</button>
    </div>
  );

  const renderJobsSection = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderAllJobsView();
      case apiStatusConstants.noJobs:
        return onNoJobsFound();
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoaderView();
      default:
        return null;
    }
  };

  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken === undefined) {
    return <Navigate to='/login' />
  }
  return (
    <>
      <Navbar />
      <div className="jobs-main-container">
        <div className="profile-filter-section">
          {profileData == {} ? renderLoaderView() : renderProfile()}
          <hr className='speration-line' />
          {renderTypeOfEmployment()}
          <hr className='speration-line' />
          {renderSalaryRange()}
        </div>
        <div className="search-all-jobs-section">
          {renderSearch()}
          {renderJobsSection()}
        </div>
      </div>
    </>
  )
}

export default Jobs