import {
  AWAIT,
  QUESTION,
  INSTRUCTIONS,
  ALT_OBJECT_TASK,
  SIMILARITIES,
  FAVOURITES,
  RESULTS,
  MATH_CHALLENGE,
  MATH_RESULTS,
} from './components/survey/survey-types'


const sessionData = {
  sessionInfo: {
    nickName: 'Primera',
    date: '20/9/2016',
  },

  surveyPath: [
    wait(),
    {
      type: ALT_OBJECT_TASK,
      payload: 'altObjectTask',
      time: 'inf',
    },
    wait(),
    {
      type: INSTRUCTIONS,
      payload: 'similarities',
      time: 'inf',
    },
    wait(),
    {
      type: SIMILARITIES,
      payload: 'altObjectTask',
      time: 'inf',
    },

    wait(),

    {
      type: QUESTION,
      payload: 'entry',
      time: 'inf',
    },

    ...task(),

    wait(),

    ...task(),

    wait(),

    {
      type: INSTRUCTIONS,
      payload: 'math',
      time: 'inf',
    },

    {
      type: MATH_CHALLENGE,
      payload: '',
      time: 'inf',
    },

    wait(),

    {
      type: MATH_RESULTS,
      payload: '',
      time: 'inf',
    },

    wait(),

    {
      type: QUESTION,
      payload: 'exit',
      time: 'inf',
    },

    wait(),
  ]
}


function wait(time) {
  return {
    type: AWAIT,
    time: time || 'inf',
  }
}

function task( type ) {
  return [
    {
      type: INSTRUCTIONS,
      payload: 'alternativeObject',
      time: 'inf',
    },

    wait(),
    {
      type: ALT_OBJECT_TASK,
      payload: 'altObjectTask',
      time: 'inf',
    },

    wait(),
    {
      type: INSTRUCTIONS,
      payload: 'similarities',
      time: 'inf',
    },
    wait(),
    {
      type: SIMILARITIES,
      payload: 'altObjectTask',
      time: 'inf',
    },

    wait(),
    {
      type: INSTRUCTIONS,
      payload: 'favourites',
      time: 'inf',
    },
    wait(),
    {
      type: FAVOURITES,
      payload: 'altObjectTask',
      time: 'inf',
    },

    wait(),
    {
      type: RESULTS,
      payload: 'altObjectTask',
      time: 'inf',
    },
  ]
}

function testIntructions() {
  return [
    {
      type: INSTRUCTIONS,
      payload: 'alternativeObject',
      time: 'inf',
    },
    {
      type: INSTRUCTIONS,
      payload: 'similarities',
      time: 'inf',
    },
    {
      type: INSTRUCTIONS,
      payload: 'favourites',
      time: 'inf',
    },
    {
      type: INSTRUCTIONS,
      payload: 'math',
      time: 'inf',
    },
  ]
}

export default sessionData
