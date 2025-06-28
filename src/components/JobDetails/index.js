import {useState, useEffect} from 'react'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt, FaRegStar} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const JobDetails = props => {
  const {match} = props
  const {params} = match
  const {id} = params
  const url = `https://apis.ccbp.in/jobs/${id}`
  const token = Cookies.get('jwt_token')
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const [currentJob, setCurrentJob] = useState({skills: [], lifeAtCompany: {}})
  const [similarJobsList, setSimilarJobsList] = useState([])
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const getData = async () => {
    setApiStatus('IN_PROGRESS')
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const job = await data.job_details
      const life = job.life_at_company
      const presentJob = {
        companyLogoUrl: job.company_logo_url,
        companyWebsiteUrl: job.company_website_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        skills: job.skills.map(each => ({
          name: each.name,
          imgUrl: each.image_url,
        })),
        lifeAtCompany: {
          description: life.description,
          imageUrl: life.image_url,
        },
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }
      const similar = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      setCurrentJob(presentJob)
      setSimilarJobsList(similar)
      console.log(data)
      setApiStatus('SUCCESS')
    } else {
      setApiStatus('FAILURE')
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const renderLodingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/content/react-js/jobby-app-job-details-failure-lg-output.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={getData}>
        Retry
      </button>
    </div>
  )

  const renderSuccessView = () => (
    <div>
      <Header />
      <div className="job-details-main-container">
        <div className="present-job-container">
          <div className="header-container">
            <div className="logo-and-title-container">
              <div className="logo-container">
                <img src={currentJob.companyLogoUrl} alt="company" />
              </div>
              <div className="title-and-rating-container">
                <p className="title">{currentJob.title}</p>
                <p className="rating">
                  <FaRegStar />
                  {currentJob.rating}
                </p>
              </div>
            </div>
            <div className="location-and-package-container">
              <div className="location-and-type-container">
                <p className="locations">
                  <IoLocationSharp />
                  {currentJob.location}
                </p>
                <p className="locations">
                  <BsBriefcaseFill />
                  {currentJob.employmentType}
                </p>
              </div>
              <div>{currentJob.packagePerAnnum}</div>
            </div>
          </div>
          <hr />
          <div className="job-details-container">
            <div className="heading-and-link">
              <h2>Description</h2>
              <a href={currentJob.companyWebsiteUrl}>
                Visit
                <FaExternalLinkAlt />
              </a>
            </div>
            <div className="current-job-description">
              {currentJob.jobDescription}
            </div>
            <div className="skills-heading">
              <h2>Skills</h2>
              <div className="skills-container">
                {currentJob.skills.map(skill => (
                  <div className="each-skill-container">
                    <img
                      className="skill-img"
                      src={skill.imgUrl}
                      alt={skill.name}
                    />
                    <p className="skill-name">{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="life-at-company-container">
              <h2>Life at Company</h2>
              <div className="life-at-company">
                <p className="life-at-company-description">
                  {currentJob.lifeAtCompany.description}
                </p>
                <img
                  className="life-at-company-img"
                  src={currentJob.lifeAtCompany.imageUrl}
                  alt="life at company"
                />
              </div>
            </div>
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <div className="similar-jobs">
          {similarJobsList.map(similar => (
            <div className="similar-job-container" key={similar.id}>
              <div className="logo-and-title-container">
                <div className="logo-container">
                  <img
                    src={similar.companyLogoUrl}
                    alt={`company logo of ${similar.title}`}
                  />
                </div>
                <div className="title-and-rating-container">
                  <p className="title">{similar.title}</p>
                  <p className="rating">
                    <FaRegStar />
                    {similar.rating}
                  </p>
                </div>
              </div>
              <h2>Description</h2>
              <p>{similar.jobDescription}</p>
              <div className="location-and-type-container">
                <p className="locations">
                  <IoLocationSharp />
                  {similar.location}
                </p>
                <p className="locations">
                  <BsBriefcaseFill />
                  {similar.employmentType}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderData = () => {
    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLodingView()
      case 'SUCCESS':
        return renderSuccessView()
      case 'FAILURE':
        return renderFailureView()
      default:
        return null
    }
  }

  return renderData()
}

export default JobDetails
