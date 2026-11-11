import { Link } from 'react-router-dom'
import Navigation from './Navigation'
import './Sidebar.css'

function Sidebar() {
  return (
    <aside className="site-sidebar">
      <Link to="/" className="sidebar-brand">
        <span className="brand-name">MARIE S.</span>
        <span className="brand-subtitle">INTERIORS</span>
      </Link>

      <div className="sidebar-divider" />

      <p className="sidebar-label">MENU</p>

      <Navigation />

      <div className="sidebar-bottom">
        <Link to="/room-designer" className="sidebar-consultation">
          Book a Consultation
        </Link>

        <p>Thoughtful spaces. Beautiful living.</p>
      </div>
    </aside>
  )
}

export default Sidebar
