// src/data/pollData.ts
import { PollData } from '../types/Poll'

const pollData: PollData[] = [
  {
    id: 'poll1',
    questions: [
      {
        id: 'q1',
        text: 'How you feel today:',
        answerOptions: [
          { id: 'a1', text: 'Brilliant! I have so much energy' },
          { id: 'a2', text: 'Always can be worse.' },
          { id: 'a3', text: 'Please, end my misery.' },
        ],
      },
      {
        id: 'q2',
        text: 'How you like the Opinary test:',
        answerOptions: [
          { id: 'a4', text: 'It was great and so challenging.' },
          { id: 'a5', text: 'Not bad, but you can improve.' },
          { id: 'a6', text: 'It was a nightmare, never again.' },
        ],
      },
    ],
  },

  {
    id: 'poll2',
    questions: [
      {
        id: 'q3',
        text: 'What is your favorite color?',
        answerOptions: [
          { id: 'a7', text: 'Red' },
          { id: 'a8', text: 'Blue' },
          { id: 'a9', text: 'Green' },
        ],
      },
      {
        id: 'q4',
        text: 'What is your hair color?',
        answerOptions: [
          { id: 'a10', text: 'Black' },
          { id: 'a11', text: 'Bllonde' },
          { id: 'a12', text: 'Brown' },
        ],
      },
    ],
  },
]

export default pollData
