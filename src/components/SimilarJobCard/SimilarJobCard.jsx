import { AiFillStar } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import './SimilarJobCard.css';

const SimilarJobCard = props => {
    const { jobDetail } = props

    return (
        <li className="job-details-item-card">
            <div className="job-details-logo-name-rating-container">
                <div className="job-details-logo-container">
                    <img alt="similar job company logo" src={jobDetail.company_logo_url} />
                </div>
                <div className="job-details-name-rating-container">
                    <h1>{jobDetail.title}</h1>
                    <p>
                        <span className="rating-star">
                            <AiFillStar className="star-tag" />
                        </span>
                        {jobDetail.rating}
                    </p>
                </div>
            </div>
            <div className="job-description-container">
                <h1>Description</h1>
                <p>{jobDetail.job_description}</p>
            </div>
            <div className="job-details-location-type-package-container">
                <div className="job-details-location-type-container">
                    <div className="job-details-location-container">
                        <p>
                            <span>
                                <MdLocationOn className="react-icon-location" />
                            </span>
                            {jobDetail.location}
                        </p>
                    </div>
                    <div className="job-details-type-container">
                        <p>
                            <span>
                                <BsFillBriefcaseFill className="react-icon-type" />
                            </span>
                            {jobDetail.employment_type}
                        </p>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default SimilarJobCard