// src/types/Poll.ts
export interface AnswerOption {
  id: string
  text: string
}

export interface Question {
  id: string
  text: string
  answerOptions: AnswerOption[]
}

export interface PollData {
  id: string
  questions: Question[]
}

export interface Vote {
  questionId: string
  answerId: string
}

export interface PollResults {
  [questionId: string]: {
    [answerId: string]: number // Count of votes for each answer
  }
}
