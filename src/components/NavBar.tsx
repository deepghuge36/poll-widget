import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        Poll Data
      </Link>
      <div className={styles.navLinks}>
        <Link to="/page1" className={styles.navLink}>
          Poll 1
        </Link>
        <Link to="/page2" className={styles.navLink}>
          Poll 2
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
