import './NotFound.css'

const NotFound = () => {
  return (
    <div className='not-found-main-container'>
      <img alt='not-found-page' src='https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png' className='not-found-image' />
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-text">We're sorry!! The page you requested for is not found.</p>
    </div>
  )
}

export default NotFound