# claude_plactice 프로젝트 문서

## 프로젝트 개요
React + Vite 기반의 싱글 페이지 애플리케이션(SPA)입니다. React Router를 통한 클라이언트 사이드 라우팅을 제공합니다.

## 기술 스택
- **프레임워크**: React 19
- **빌드 도구**: Vite 8
- **라우팅**: react-router-dom
- **MD 렌더링**: react-markdown
- **언어**: TypeScript (TSX)
- **스타일**: SCSS (Sass) — `_variables.scss`, `_mixins.scss` 공통 파일 분리
- **디자인**: 좌측 정렬 기반 트렌디 레이아웃, 인디고~퍼플 그래디언트 포인트 컬러, Linear/Vercel 스타일

## 페이지 구성

### 홈 (`/`)
- `public/project-info.md` 파일을 불러와 마크다운 뷰어로 렌더링
- LLM 연동 예정 (현재 미연결): 키워드 검색 → RAG 기반 AI 응답

### 할 일 (`/todo`)
- 할 일 목록을 관리하는 페이지 (구현 예정)

### 대시보드 (`/dashboard`)
- 현황을 한눈에 볼 수 있는 대시보드 페이지 (구현 예정)

## 공통 컴포넌트

### Header
- 위치: `src/components/Header.jsx`
- 모든 페이지 상단에 표시되는 고정 헤더
- 네비게이션 링크: 홈, 할 일, 대시보드
- 현재 활성 페이지 링크를 시각적으로 표시 (NavLink + `.active` 클래스)
- `sticky` 포지션으로 스크롤 시에도 항상 상단 고정

## 디렉토리 구조

```
src/
  components/
    Header.jsx       # 공통 헤더 컴포넌트
    Header.css       # 헤더 스타일
  pages/
    Home.jsx         # 홈 페이지 (MD 뷰어 / LLM 검색 예정)
    Home.css         # 홈 페이지 스타일
    Todo.jsx         # 할 일 페이지
    Dashboard.jsx    # 대시보드 페이지
  App.jsx            # 라우터 설정 및 앱 루트
  App.css            # 전역 스타일
  main.jsx           # React 진입점
public/
  project-info.md    # 프로젝트 문서 (홈 뷰어 표시 / 추후 LLM RAG 소스)
```

## AI 기능 계획 (미연결)

### RAG 동작 방식 (예정)
1. 홈 페이지 로드 시 `/project-info.md` 파일을 fetch
2. 사용자가 검색 input에 키워드 입력
3. 프로젝트 문서를 system 프롬프트로, 사용자 키워드를 user 메시지로 LLM API 호출
4. 스트리밍으로 응답을 실시간으로 표시

### 시도한 LLM API
| API | 상태 | 이유 |
|-----|------|------|
| Anthropic Claude | ❌ 크레딧 부족 | 무료 티어 없음 |
| Google Gemini | ❌ 할당량 0 | 프로젝트 설정 문제 |
| Groq | ❌ 네트워크 차단 | 현재 네트워크 환경 |

## 환경 설정
- 개발 서버: `npm run dev`
- 빌드: `npm run build`
