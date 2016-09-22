import {
  AWAIT,
  QUESTION,
  INSTRUCTIONS,
  MATH_CHALLENGE,
  ALT_OBJECT_TASK,
  SIMILARITIES,
  FAVOURITES,
  MATH_RESULTS,
  RESULTS,
} from './components/survey/survey-types'

// import {
//   question1,
// } from './survey-data/survey-questions'


// export const AWAIT = 'AWAIT'
// export const QUESTION = 'QUESTION'
// export const INSTRUCTIONS = 'INSTRUCTIONS'
// export const EXAMPLE = 'EXAMPLE'
// export const MATH_CHALLENGE = 'MATH_CHALLENGE'
// export const ALT_OBJECT_TASK = 'ALT_OBJECT_TASK'
// export const SIMILARITIES = 'SIMILARITIES'
// export const FAVOURITES = 'FAVOURITES'
// export const MATH_RESULTS = 'MATH_RESULTS'
// export const RESULTS = 'RESULTS'

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
      type: ALT_OBJECT_TASK,
      payload: 'altObjectTask',
      time: 'inf',
    },
    {
      type: SIMILARITIES,
      payload: 'altObjectTask',
      time: 'inf',
    },
    {
      type: QUESTION,
      payload: 'entry',
      time: 'inf',
    },

    //first round
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: INSTRUCTIONS,
      payload: 'altObjectTask',
      time: 'inf',
    },
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: ALT_OBJECT_TASK,
      payload: 'altObjectTask',
      time: 'inf',
    },
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: INSTRUCTIONS,
      payload: 'altObjectTask',
      time: 'inf',
    },
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: SIMILARITIES,
      payload: 'altObjectTask',
      time: 'inf',
    },
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: INSTRUCTIONS,
      payload: 'altObjectTask',
      time: 'inf',
    },
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: FAVOURITES,
      payload: 'altObjectTask',
      time: 'inf',
    },
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: RESULTS,
      payload: 'altObjectTask',
      time: 'inf',
    },

    //Second round
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: INSTRUCTIONS,
      payload: 'altObjectTask',
      time: 'inf',
    },
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: ALT_OBJECT_TASK,
      payload: 'altObjectTask',
      time: 'inf',
    },
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: INSTRUCTIONS,
      payload: 'altObjectTask',
      time: 'inf',
    },
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: SIMILARITIES,
      payload: 'altObjectTask',
      time: 'inf',
    },
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: INSTRUCTIONS,
      payload: 'altObjectTask',
      time: 'inf',
    },
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: FAVOURITES,
      payload: 'altObjectTask',
      time: 'inf',
    },
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: RESULTS,
      payload: 'altObjectTask',
      time: 'inf',
    },


    //End
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: INSTRUCTIONS,
      payload: 'math',
      time: 'inf',
    },
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: MATH_CHALLENGE,
      payload: '',
      time: 'inf',
    },
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: MATH_RESULTS,
      payload: '',
      time: 'inf',
    },
    {
      type: AWAIT,
      time: 'inf',
    },
    {
      type: QUESTION,
      payload: 'exit',
      time: 'inf',
    },
  ]
}

export default sessionData
