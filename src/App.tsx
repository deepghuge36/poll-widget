import React, { useState, useEffect } from 'react'
import PollWidget from './components/PollWidget'
import { DISPLAYED_POLLS_KEY } from './constants'
import pollData from './data/pollData'
import './App.css' // Import styles

const App: React.FC = () => {
  const [displayedPolls, setDisplayedPolls] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      try {
        const storedDisplayedPolls = localStorage.getItem(DISPLAYED_POLLS_KEY)
        const initialPolls = storedDisplayedPolls
          ? JSON.parse(storedDisplayedPolls)
          : []
        setDisplayedPolls(initialPolls)
      } catch (error) {
        console.error('Error loading displayed polls:', error)
      } finally {
        setIsLoading(false)
      }
    }, 1000) // Add delay for better UX
  }, [])

  return (
    <div className="App">
      {isLoading ? (
        <div className="loadingContainer">
          <div className="loadingText">Loading...</div>
        </div>
      ) : (
        <>
          {pollData
            .filter((poll) => !displayedPolls.includes(poll.id))
            .map((poll) => (
              <PollWidget key={poll.id} pollId={poll.id} />
            ))}
        </>
      )}
    </div>
  )
}

export default App
