import {
  AWAIT,
  QUESTION,
  INSTRUCTIONS,
} from './components/survey/survey-types'

// import {
//   question1,
// } from './survey-data/survey-questions'

const sessionData = {
  sessionInfo: {
    nickName: 'Primera',
    date: '20/9/2016',
  },
  surveyPath: [
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: QUESTION,
      payload: 4,
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
