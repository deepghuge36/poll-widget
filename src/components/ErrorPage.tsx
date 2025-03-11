import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ErrorPage.module.css'

const ErrorPage: React.FC = () => {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>Oops! Something went wrong.</h1>
      <p className={styles.errorMessage}>
        An unexpected error occurred. Please try again later.
      </p>
      <Link to="/" className={styles.homeButton}>
        Go to Home
      </Link>
    </div>
  )
}

export default ErrorPage
