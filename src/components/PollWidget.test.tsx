import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import PollWidget from './PollWidget'
import pollData from '../data/pollData'

describe('PollWidget Component', () => {
  it('renders poll questions', () => {
    render(<PollWidget pollId="poll1" />)

    expect(screen.getByText(pollData[0].questions[0].text)).toBeInTheDocument()
  })

  it('renders answer options', () => {
    render(<PollWidget pollId="poll1" />)

    expect(
      screen.getByText((content) =>
        content.includes(pollData[0].questions[0].answerOptions[0].text),
      ),
    ).toBeInTheDocument()
  })

  it('updates votes when an option is clicked', () => {
    render(<PollWidget pollId="poll1" />)

    const option = screen.getByText((content) =>
      content.includes(pollData[0].questions[0].answerOptions[0].text),
    )
    fireEvent.click(option)

    expect(screen.getByText(/1 votes/)).toBeInTheDocument()
  })
})
