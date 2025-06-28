import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const ProfileItem = () => {
  const [profileData, setProfileData] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const token = Cookies.get('jwt_token')
  const getProfileData = async () => {
    setApiStatus('IN_PROGRESS')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const profileDetails = data.profile_details
      const updatedProfileData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      setProfileData(updatedProfileData)
      setApiStatus('SUCCESS')
    } else {
      setApiStatus('FAILURE')
    }
  }

  useEffect(() => {
    getProfileData()
    // eslint-disable-next-line
  }, [])

  const renderProfileView = () => (
    <div className="profile-container">
      <img src={profileData.profileImageUrl} alt="profile" />
      <h1 className="profile-name">{profileData.name}</h1>
      <p className="profile-bio">{profileData.shortBio}</p>
    </div>
  )

  const renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
    </div>
  )

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderFinalView = () => {
    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderProfileView()
      case 'FAILURE':
        return renderFailureView()
      default:
        return null
    }
  }

  return <div>{renderFinalView()}</div>
}

export default ProfileItem
