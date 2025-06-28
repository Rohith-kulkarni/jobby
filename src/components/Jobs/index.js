import {useEffect, useState} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProfileItem from '../ProfileItem'
import EmploymentFilters from '../EmploymentFilters'
import SalaryRangeListItem from '../SalaryRangeListItem'
import JobItem from '../JobItem'

import './index.css'

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
]

const Jobs = () => {
  const [jobsList, setJobsList] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [checkedTypes, setCheckedTypes] = useState([])
  const [selectedSalary, setSelectedSalary] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [apiStatus, setApiStatus] = useState('INITIAL')

  const token = Cookies.get('jwt_token')
  const url = `https://apis.ccbp.in/jobs?employment_type=${checkedTypes.join(
    ',',
  )}&minimum_package=${selectedSalary}&search=${searchQuery}`
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const fetchJobsData = async () => {
    setApiStatus('IN_PROGRESS')
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      if (data.jobs.length === 0) {
        setApiStatus('NO_JOBS')
      } else {
        const updatedJobs = data.jobs.map(job => ({
          id: job.id,
          title: job.title,
          rating: job.rating,
          companyLogoUrl: job.company_logo_url,
          location: job.location,
          employmentType: job.employment_type,
          packagePerAnnum: job.package_per_annum,
          jobDescription: job.job_description,
        }))
        setJobsList(updatedJobs)
        setApiStatus('SUCCESS')
      }
    } else {
      setApiStatus('FAILURE')
    }
  }

  useEffect(() => {
    fetchJobsData()
    // eslint-disable-next-line
  }, [url])

  const onSearch = () => {
    setSearchQuery(searchInput)
  }

  const onUserEntry = event => {
    setSearchInput(event.target.value)
  }

  const onSelectingEmployee = name => {
    setCheckedTypes(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name],
    )
  }

  const onSalarySelect = name => {
    setSelectedSalary(name)
  }

  const renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/content/react-js/jobby-app-job-details-failure-lg-output.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={fetchJobsData}>
        Retry
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderNoJobsView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  const renderSuccessView = () => (
    <div>
      {jobsList.map(job => (
        <JobItem key={job.id} jobDetails={job} />
      ))}
    </div>
  )

  const renderJobsData = () => {
    switch (apiStatus) {
      case 'SUCCESS':
        return renderSuccessView()
      case 'FAILURE':
        return renderFailureView()
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'NO_JOBS':
        return renderNoJobsView()
      default:
        return null
    }
  }

  return (
    <div>
      <Header />
      <div className="jobs-main-container">
        <div className="left-container">
          <ProfileItem />
          <hr />
          <EmploymentFilters
            employmentTypesList={employmentTypesList}
            onSelectingEmployee={onSelectingEmployee}
            checkedTypes={checkedTypes}
          />
          <hr />
          <SalaryRangeListItem
            salaryRangesList={salaryRangesList}
            onSalarySelect={onSalarySelect}
          />
        </div>
        <div className="right-container">
          <div className="search-container">
            <input
              className="job-search"
              type="search"
              placeholder="search"
              onChange={onUserEntry}
              value={searchInput}
            />
            <button type="button" data-testid="searchButton" onClick={onSearch}>
              <BsSearch className="search-icon" />
            </button>
          </div>
          {renderJobsData()}
        </div>
      </div>
    </div>
  )
}

export default Jobs
