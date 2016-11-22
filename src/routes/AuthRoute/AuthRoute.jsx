//-----------  Imports  -----------//

import React, { PropTypes } from 'react'
import { Link }             from 'react-router'

//-----------  Class Setup  -----------//

class AuthRoute extends React.Component {

  render(){
    return(
      <main>
        <Link to={'/'}>home</Link>
        <a>logout</a>

        {this.props.children}
      </main>
    )
  }
}

//-----------  Export  -----------//

export default AuthRoute
