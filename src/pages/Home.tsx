import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import './Home.scss'

interface Feature {
  icon: string
  title: string
  desc: string
}

interface TocItem {
  label: string
}

const FEATURES: Feature[] = [
  { icon: '⚡', title: 'React Router', desc: '클라이언트 사이드 SPA 라우팅' },
  { icon: '🧩', title: '공통 Header', desc: 'Sticky + 활성 탭 자동 표시' },
  { icon: '🤖', title: 'AI 검색 (예정)', desc: 'Groq RAG 기반 스트리밍 응답' },
]

const TOC: TocItem[] = [
  { label: '프로젝트 개요' },
  { label: '기술 스택' },
  { label: '페이지 구성' },
  { label: '공통 컴포넌트' },
  { label: '디렉토리 구조' },
  { label: 'AI 기능 계획' },
]

function slugify(text: string): string {
  return text.trim().replace(/\s+/g, '-')
}

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 id={slugify(String(children))}>{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 id={slugify(String(children))}>{children}</h3>
  ),
}

export default function Home() {
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    fetch('/project-info.md')
      .then((res) => res.text())
      .then(setContent)
  }, [])

  return (
    <div className="home">
      {/* 히어로 */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="home-hero-left">
            <h1>
              Practice<br />
              <span className="gradient-text">React + AI</span>
            </h1>
            <p>
              React 19 · Vite · React Router로 구성한 SPA 프로젝트.
              AI 검색, 할 일 관리, 대시보드를 단계적으로 구현합니다.
            </p>
          </div>
          <div className="home-hero-right">
            {FEATURES.map((f) => (
              <div key={f.title} className="hero-card">
                <div className="hero-card-icon">{f.icon}</div>
                <div className="hero-card-text">
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 본문 */}
      <div className="home-content">
        <aside className="home-toc">
          <p>목차</p>
          <ul>
            {TOC.map((item) => (
              <li key={item.label}>
                <a href={`#${slugify(item.label)}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </aside>
        <article className="md-viewer">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  )
}
