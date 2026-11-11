import { NavLink } from 'react-router-dom'

function Navigation() {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Inspiration', path: '/inspiration' },
    { name: 'Room Designer', path: '/room-designer' },
    { name: 'My Projects', path: '/projects' },
  ]

  return (
    <nav className="navigation">
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          end={link.path === '/'}
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  )
}

export default Navigation
