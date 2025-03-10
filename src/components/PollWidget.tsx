import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Question from './Question'
import pollData from '../data/pollData'
import { Question as QuestionType, PollResults } from '../types/Poll'
import { POLL_WIDGET_VOTES_KEY } from '../constants'
import styles from './PollWidget.module.css'

interface PollWidgetProps {
  pollId: string
}

const PollWidget: React.FC<PollWidgetProps> = ({ pollId }) => {
  const poll = pollData.find((p) => p.id === pollId)
  const [results, setResults] = useState<PollResults>({})

  // Load votes from localStorage when the widget loads
  useEffect(() => {
    const storedResults = localStorage.getItem(POLL_WIDGET_VOTES_KEY)
    if (storedResults) {
      setResults(JSON.parse(storedResults)) // Load votes only once
    }
  }, [])

  // Save updated votes to localStorage only if changed
  useEffect(() => {
    if (Object.keys(results).length > 0) {
      const prevResults = localStorage.getItem(POLL_WIDGET_VOTES_KEY)
      if (JSON.stringify(results) !== prevResults) {
        localStorage.setItem(POLL_WIDGET_VOTES_KEY, JSON.stringify(results))
      }
    }
  }, [results])

  const handleVote = (questionId: string, answerId: string) => {
    // Create new results object first
    const newResults = { ...results }

    if (!newResults[questionId]) {
      newResults[questionId] = {}
    }
    if (!newResults[questionId][answerId]) {
      newResults[questionId][answerId] = 0
    }

    newResults[questionId][answerId] += 1

    // Update state and save immediately
    setResults(newResults)
    localStorage.setItem(POLL_WIDGET_VOTES_KEY, JSON.stringify(newResults))
    localStorage.setItem(`selected-${questionId}`, answerId)
  }

  if (!poll) {
    return (
      <div className={styles.errorContainer}>
        <h2>Poll Not Found</h2>
        <p>The requested poll ID is invalid. Please try another poll.</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{poll.id}</h2>
      {poll.questions.map((question: QuestionType) => (
        <Question
          key={question.id}
          questionId={question.id}
          questionText={question.text}
          answerOptions={question.answerOptions}
          results={results[question.id] || {}}
          onVote={handleVote}
        />
      ))}
    </div>
  )
}

//  Function to mount PollWidget in standalone HTML pages
export function mountPollWidget(elementId: string, pollId: string) {
  const container = document.getElementById(elementId)
  if (container) {
    const root = ReactDOM.createRoot(container)
    root.render(<PollWidget pollId={pollId} />)
  }
}

// Expose it globally (important for non-React HTML pages)
if (typeof window !== 'undefined') {
  ;(
    window as unknown as {
      PollWidgetLibrary: {
        mountPollWidget: (elementId: string, pollId: string) => void
      }
    }
  ).PollWidgetLibrary = { mountPollWidget }
}

export default PollWidget
