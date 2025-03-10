import React, { useEffect, useState } from 'react'
import AnswerOption from './AnswerOption'
import { AnswerOption as AnswerOptionType } from '../types/Poll'
import styles from './Question.module.css'

interface QuestionProps {
  questionText: string
  questionId: string
  answerOptions: AnswerOptionType[]
  results: { [answerId: string]: number }
  onVote: (questionId: string, answerId: string) => void
}

const Question: React.FC<QuestionProps> = ({
  questionText,
  questionId,
  answerOptions,
  results,
  onVote,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  // Load the selected answer from localStorage
  useEffect(() => {
    const storedAnswer = localStorage.getItem(`selected-${questionId}`)
    if (storedAnswer) {
      setSelectedAnswer(storedAnswer)
    }
  }, [questionId]) // Ensure it re-renders when `questionId` changes

  const totalVotes = Object.values(results).reduce(
    (sum, count) => sum + count,
    0,
  )

  const handleVote = (answerId: string) => {
    setSelectedAnswer(answerId)
    localStorage.setItem(`selected-${questionId}`, answerId) // Store the selected option
    onVote(questionId, answerId)
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.questionText}>{questionText}</h3>
      {answerOptions.map((answer) => (
        <AnswerOption
          key={answer.id}
          answerText={answer.text}
          voteCount={results[answer.id] || 0}
          totalVotes={totalVotes}
          isSelected={selectedAnswer === answer.id} // Highlight the selected option
          onVote={() => handleVote(answer.id)}
        />
      ))}
    </div>
  )
}

export default Question
