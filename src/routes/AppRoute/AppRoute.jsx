//-----------  Imports  -----------//

import React, { PropTypes } from 'react'
import { Link }             from 'react-router'

//-----------  Class Setup  -----------//

class AppRoute extends React.Component {

  render(){
    return(
      <main>
        <Link to={'/login'}>login</Link>
        <Link to={'/dashboard'}>Dashboard</Link>

        {this.props.children}
      </main>
    )
  }
}

//-----------  Export  -----------//

export default AppRoute
