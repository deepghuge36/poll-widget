import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { DISPLAYED_POLLS_KEY } from './constants'

jest.setTimeout(15000) // Increase timeout for long-running tests

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows loading state initially', async () => {
    render(<App />)
    expect(screen.getByText('Loading...')).toBeInTheDocument() // Check loading first
  })

  it('loads displayed polls from localStorage', async () => {
    localStorage.setItem(DISPLAYED_POLLS_KEY, JSON.stringify(['poll1']))
    render(<App />)
    await waitFor(
      () => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })
})
