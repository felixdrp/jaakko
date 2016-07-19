import React from 'react'
import ButtonLoginWithBase from './buttonLoginWithBase'

/**
 * Component that render a login with Facebook button.
 *
 * Example usage :
 * ```
 * <ButtonLoginWithTwitter />
 * ```
 */

const buttonLoginWithTwitter = (props) => (
  <ButtonLoginWithBase
    width={ props.width }
    brandName="Twitter"
    brandLogo={
      (
        <div
          style={{
            display: 'inline-block',
            height: 18,
            margin: 3,
            marginTop: 2,
            marginRight: 6,
            padding: 0,
            width: 18,
          }}
        >
          <i
            className="fa fa-twitter"
            style={{
              position: 'relative',
              bottom: -2,
              left: 2,
              fontSize: 20,
              color: 'rgba(25, 182, 233, 0.8)',
              textShadow: '0.5px 0px 2px #def, 0 0 0 #000, 1px 1px 1px #f6fbff',
            }}
          ></i>
        </div>
      )
    }
  />
);

export default buttonLoginWithTwitter;
