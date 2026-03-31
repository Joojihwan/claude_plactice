import { NavLink } from 'react-router-dom'
import './Header.scss'

const NAV_ITEMS = [
  { to: '/', label: '홈', end: true },
  { to: '/todo', label: '할 일' },
  { to: '/dashboard', label: '대시보드' },
] as const

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        claude<span className="logo-accent">_plactice</span>
      </div>
      <nav className="header-nav">
        {NAV_ITEMS.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Header
