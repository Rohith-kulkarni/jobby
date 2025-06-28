import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    companyLogoUrl,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  return (
    <Link className="job-link" to={`/jobs/${id}`}>
      <div className="job-card">
        <div className="job-header">
          <img
            src={companyLogoUrl}
            alt={`company logo of ${title}`}
            className="company-logo"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <FaStar color="gold" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-info">
          <div className="location-type">
            <p>
              <IoLocationSharp /> {location}
            </p>
            <p>
              <BsBriefcaseFill /> {employmentType}
            </p>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr />
        <h2 className="description-title">Description</h2>
        <p className="job-description">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobItem
