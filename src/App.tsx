import React, { useState, useEffect, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import PollWidget from './components/PollWidget'
import './App.css' // Import styles
import NavBar from './components/NavBar'
import ErrorPage from './components/ErrorPage'

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by Error Boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />
    }
    return this.props.children
  }
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Add delay for better UX
  }, [])

  return (
    <Router>
      <ErrorBoundary>
        <NavBar />
        <Suspense
          fallback={
            <div className="loadingContainer">
              <div className="loadingText">Loading polls...</div>
            </div>
          }
        >
          <div className="App">
            {isLoading ? (
              <div className="loadingContainer">
                <div className="loadingText">Loading...</div>
              </div>
            ) : (
              <Routes>
                <Route path="/" element={<Navigate to="/poll1" />} />
                <Route path="/poll1" element={<PollWidget pollId="poll1" />} />
                <Route path="/poll2" element={<PollWidget pollId="poll2" />} />
                <Route path="*" element={<h2>Page Not Found</h2>} />
              </Routes>
            )}
          </div>
        </Suspense>
      </ErrorBoundary>
    </Router>
  )
}

export default App
