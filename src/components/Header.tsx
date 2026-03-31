import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import './Header.scss'

const NAV_ITEMS = [
  { to: '/', label: '홈', end: true },
  { to: '/todo', label: '할 일' },
  { to: '/dashboard', label: '대시보드' },
] as const

export default function Header() {
  const { user } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/auth')
  }

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
      <div className="header-user">
        <span className="header-email">{user?.email}</span>
        <button className="header-logout" onClick={handleLogout}>로그아웃</button>
      </div>
    </header>
  )
}
