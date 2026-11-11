import { Link } from 'react-router-dom'
import Navigation from './Navigation'
import './Header.css'

function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span className="brand-name">MARIE S.</span>
        <span className="brand-subtitle">INTERIORS</span>
      </Link>

      <Navigation />

      <Link to="/room-designer" className="consultation-button">
        Book a Consultation
      </Link>
    </header>
  )
}

export default Header
