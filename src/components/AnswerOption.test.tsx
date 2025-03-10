import { render, screen } from '@testing-library/react'
import AnswerOption from './AnswerOption'

const props = {
  answerText: 'Brilliant! I have so much energy',
  voteCount: 5,
  totalVotes: 10,
  isSelected: true, // Ensure it's marked as selected
  onVote: jest.fn(),
}

describe('AnswerOption Component', () => {
  it('applies the selected class when clicked', () => {
    render(<AnswerOption {...props} />)

    const selectedOption = screen
      .getByText((content) => content.includes(props.answerText))
      .closest('.optionContainer') // Find the correct parent

    expect(selectedOption).toHaveClass('selected')
  })

  it('progress bar updates correctly', () => {
    render(<AnswerOption {...props} />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveStyle('width: 50%')
  })
})
