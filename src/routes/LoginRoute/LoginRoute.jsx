//-----------  Imports  -----------//

import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'

//-----------  Class Setup  -----------//

class LoginRoute extends React.Component {

  render(){
    return(
      <section>
        <h1>Login</h1>
        <form noValidate onSubmit={this.props.handleSubmit}>
          <Field
            type='email'
            name='email'
            required={true}
            placeholder='EMAIL'
            component='input'
          />
          <Field
            type='password'
            name='password'
            required={true}
            placeholder='PASSWORD'
            component='input'
          />
          <button type='submit'>Login</button>
        </form>
      </section>
    )
  }
}

//-----------  Exports  -----------//

export default reduxForm({ form: 'login-form' })(LoginRoute)
