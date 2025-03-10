import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Question from './Question'

const mockOnVote = jest.fn()

const questionProps = {
  questionText: 'How you feel today?',
  questionId: 'q1',
  answerOptions: [
    { id: 'a1', text: 'Brilliant! I have so much energy' },
    { id: 'a2', text: 'Always can be worse.' },
    { id: 'a3', text: 'Please, end my misery.' },
  ],
  results: { a1: 2, a2: 1 },
  onVote: mockOnVote,
}

describe('Question Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('loads the selected answer from localStorage', async () => {
    localStorage.setItem('selected-q1', 'a1')

    render(<Question {...questionProps} />)

    // Wait for the UI to update
    await waitFor(() => {
      const selectedOption = screen
        .getByText((content) =>
          content.includes('Brilliant! I have so much energy'),
        )
        .closest('.optionContainer') // Get the option container

      expect(selectedOption).toHaveClass('selected')
    })
  })

  it('updates localStorage when a user selects an answer', () => {
    render(<Question {...questionProps} />)

    const option = screen.getByText((content) =>
      content.includes('Brilliant! I have so much energy'),
    )
    fireEvent.click(option)

    expect(localStorage.getItem('selected-q1')).toBe('a1')
  })

  it('calls onVote when an option is clicked', () => {
    render(<Question {...questionProps} />)

    const option = screen.getByText((content) =>
      content.includes('Always can be worse.'),
    )
    fireEvent.click(option)

    expect(mockOnVote).toHaveBeenCalledWith('q1', 'a2')
  })
})
