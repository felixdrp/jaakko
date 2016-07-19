import React from 'react'
import ButtonLoginWithBase from './buttonLoginWithBase'

/**
 * Component that render a login with Facebook button.
 *
 * Example usage :
 * ```
 * <ButtonLoginWithLinkedin />
 * ```
 */

const buttonLoginWithLinkedin = (props) => (
  <ButtonLoginWithBase
    width={ props.width }
    brandName="Linkedin"
    brandLogo={
      (
        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#0077B5',
            borderRadius: 2,
            height: 18,
            margin: 4,
            marginRight: 6,
            padding: 0,
            width: 18,
            color: 'white',
          }}
        >
          <i
            className="fa fa-linkedin"
            style={{
              position: 'relative',
              // bottom: -2,
              left: 2,
              fontSize: 16.4,
            }}
          ></i>
        </div>
      )
    }
  />
);

export default buttonLoginWithLinkedin;
