//-----------  Imports  -----------//

import has                       from 'lodash/has'

import React, { PropTypes }      from 'react'
import { Router, RouterContext } from 'react-router'
import { Provider }              from 'react-redux'

//-----------  Component  -----------//

class AppRoot extends React.Component {

  componentWillMount(){
    this.props.actions.requestToken()
  }

  onUpdate = () => {
    console.log('UPDATE', this.props.store.getState())
  }

  render(){
    const { store, history, routes, isServer, renderProps, ...props } = this.props

    return (
      <Provider store={store}>
        {isServer
          ? <RouterContext {...renderProps} />
          : <Router history={history} routes={routes} onUpdate={this.onUpdate} />
        }
      </Provider>
    )
  }
}

//-----------  Prop Types  -----------//

AppRoot.propTypes = {
  store       : PropTypes.object.isRequired,
  history     : PropTypes.object.isRequired,
  routes      : PropTypes.array.isRequired,
  isServer    : PropTypes.bool.isRequired,
  renderProps : PropTypes.object
}

//-----------  Exports  -----------//

export default AppRoot
