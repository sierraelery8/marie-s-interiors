import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <p className="not-found-label">Marie S Interiors</p>

        <h1 className="not-found-number">404</h1>

        <h2>Looks like this space is empty.</h2>

        <p>
          Sorry, we couldn't find the page you're looking for.
          Let's get you back to something beautiful.
        </p>

        <Link to="/" className="not-found-link">
          Return Home
        </Link>
      </div>
    </main>
  )
}

export default NotFound
