import { Link } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';
import { MdLocationPin } from 'react-icons/md';
import { BsBriefcase } from 'react-icons/bs';
import './JobItem.css'

const JobItem = (props) => {
  return (
    <Link to={`/jobs/${props.id}`} className='job-details-link'>
      <div className='jobItem-main-container'>
        <div className="job-logo-post-star-container">
          <div className="job-logo-container">
            <img src={props.logo} alt="company-logo" />
          </div>
          <div className="job-post-star-container">
            <p className="job-post-heading">{props.title}</p>
            <span><BsFillStarFill color='yellow' /><span className='icon-text'>{props.rating}</span></span>
          </div>
        </div>
        <div className="job-place-lpa-container">
          <div className="job-place-type-container">
            <span><MdLocationPin /><span className='icon-text'>{props.location}</span></span>
            <span><BsBriefcase /><span className='icon-text'>{props.employment_type}</span></span>
          </div>
          <div className="job-lpa-container">{props.package_per_annum}</div>
        </div>
        <hr className='speration-line' />
        <div className="job-description-container">
          <p className="job-heading">Description</p>
          <p className="job-para">{props.job_description}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobItem