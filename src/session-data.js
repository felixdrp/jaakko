import {
  AWAIT,
  QUESTION,
  INSTRUCTIONS,
} from './components/survey/survey-types'

const sessionData = {
  sessionInfo: {
    date: '20/9/2016',
  },
  surveyPath: [
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: QUESTION,
      questions: ' ',
      time: 'inf',
    },
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: INSTRUCTIONS,
      time: 'inf',
    },
    {
      type: AWAIT,
      time: 'inf',
    },
  ]
}

export default sessionData
