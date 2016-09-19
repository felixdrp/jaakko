// Survey types

export const AWAIT = 'AWAIT'
export const QUESTION = 'QUESTION'
export const INSTRUCTIONS = 'INSTRUCTIONS'
export const EXAMPLE = 'EXAMPLE'
export const MATH_CHALLENGE = 'MATH_CHALLENGE'
export const ALT_OBJECT_TASK = 'ALT_OBJECT_TASK'
export const SIMILARITIES = 'SIMILARITIES'
export const FAVOURITES = 'FAVOURITES'
export const MATH_RESULTS = 'MATH_RESULTS'
export const RESULTS = 'RESULTS'


// If routes change please change also this part
export function resolveSurveyURL(type) {
  let composeUrl = (parcialUrl) => `/survey/${parcialUrl}`

  switch (type) {
    case AWAIT:
      return composeUrl('waitSync')

    case INSTRUCTIONS:
      return composeUrl('instructions')

    case QUESTION:
      return composeUrl('question')

    case EXAMPLE:
      return composeUrl('example')

    case MATH_CHALLENGE:
      return composeUrl('mathChallenge')

    case ALT_OBJECT_TASK:
      return composeUrl('altObjectTask')

    case SIMILARITIES:
      return composeUrl('similarities')

    case FAVOURITES:
      return composeUrl('favourites')

    case MATH_RESULTS:
      return composeUrl('mathResults')

    case RESULTS:
      return composeUrl('results')
  }
}
