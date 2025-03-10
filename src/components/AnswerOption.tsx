import React from 'react'
import styles from './AnswerOption.module.css'

interface AnswerOptionProps {
  answerText: string
  voteCount: number
  totalVotes: number
  isSelected: boolean
  onVote: () => void
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  answerText,
  voteCount,
  totalVotes,
  isSelected,
  onVote,
}) => {
  const percentage = totalVotes ? (voteCount / totalVotes) * 100 : 0

  return (
    <div
      className={`${styles.optionContainer} ${
        isSelected ? styles.selected : ''
      }`}
    >
      <button className={styles.button} onClick={onVote}>
        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            role="progressbar"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span>
          {answerText} {voteCount > 0 && `(${voteCount} votes)`}
        </span>
      </button>
      <span className={styles.percentage}>{percentage.toFixed(1)}%</span>
    </div>
  )
}

export default AnswerOption
