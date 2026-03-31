import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import './Auth.scss'

type Mode = 'login' | 'signup'

export default function Auth() {
  const { session, loading } = useAuth()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (loading) return null
  if (session) return <Navigate to="/" replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')
    setSubmitting(true)

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setErrorMsg(error.message)
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setErrorMsg(error.message)
      else setSuccessMsg('가입 확인 이메일을 발송했습니다. 이메일을 확인해주세요.')
    }

    setSubmitting(false)
  }

  return (
    <div className="auth">
      <div className="auth-card">
        {/* 로고 */}
        <div className="auth-logo">
          claude<span>_plactice</span>
        </div>

        <h1 className="auth-title">
          {mode === 'login' ? '로그인' : '회원가입'}
        </h1>
        <p className="auth-sub">
          {mode === 'login'
            ? '계속하려면 로그인하세요.'
            : '새 계정을 만들어 시작하세요.'}
        </p>

        {/* 탭 */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg('') }}
          >
            로그인
          </button>
          <button
            className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg('') }}
          >
            회원가입
          </button>
        </div>

        {/* 폼 */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="auth-field">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder={mode === 'signup' ? '8자 이상 입력' : '비밀번호 입력'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={mode === 'signup' ? 8 : undefined}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {errorMsg && <p className="auth-error">{errorMsg}</p>}
          {successMsg && <p className="auth-success">{successMsg}</p>}

          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting
              ? '처리 중…'
              : mode === 'login' ? '로그인' : '계정 만들기'}
          </button>
        </form>
      </div>
    </div>
  )
}
