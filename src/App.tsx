import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Header from './components/Header'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Todo from './pages/Todo'
import Dashboard from './pages/Dashboard'
import './App.scss'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()
  if (loading) return null
  if (!session) return <Navigate to="/auth" replace />
  return <>{children}</>
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todo" element={<Todo />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
