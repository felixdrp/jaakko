import expect from 'expect'
import synchronize from '../../src/reducers/sync'
import * as actions from '../../src/actions/actions'

describe('synchronize reducer', () => {
  it('should return the initial state', () => {
    expect(
      synchronize(undefined, {})
    ).toEqual({ wait: true })
  })

  it('should handle WAIT', () => {
    expect(
      synchronize({}, { type: actions.WAIT })
    ).toEqual({ wait: true })

    expect(
      synchronize(
        {
          wait: false
        },
        {
          type: actions.WAIT,
        }
      )
    ).toEqual({ wait: true })

    expect(
      synchronize(
        {
          wait: false
        },
        actions.synchronize('wait')
      )
    ).toEqual({ wait: true })
  })

  it('should handle CONTINUE', () => {
    expect(
      synchronize({}, { type: actions.CONTINUE })
    ).toEqual({ wait: false })

    expect(
      synchronize(
        {
          wait: false
        },
        {
          type: actions.CONTINUE,
        }
      )
    ).toEqual({ wait: false })

    expect(
      synchronize(
        {
          wait: true
        },
        {
          type: actions.CONTINUE,
        }
      )
    ).toEqual({ wait: false })

    expect(
      synchronize(
        {
          wait: true
        },
        actions.synchronize('continue')
      )
    ).toEqual({ wait: false })
  })
})
