import React from 'react'
import ButtonLoginWithBase from './buttonLoginWithBase'

/**
 * Component that render a login with Facebook button.
 *
 * Example usage :
 * ```
 * <ButtonLoginWithFacebook />
 * ```
 */

const buttonLoginWithFacebook = (props) => (
  <ButtonLoginWithBase
    width={ props.width }
    brandName="Facebook"
    brandLogo={
      (
        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#3B5998',
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
            className="fa fa-facebook"
            style={{
              position: 'relative',
              bottom: -2,
              left: 7,
            }}
          ></i>
        </div>
      )
    }
  />
);

export default buttonLoginWithFacebook;
