//-----------  Imports  -----------//

import * as ActionTypes from './actions'

//-----------  Reducers  -----------//

const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE)
    return null
  else if (error)
    return action.error
  else
    return state
}

const router = (state = { pathname: '/' }, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_ROUTER_STATE:
      return action.state
    default:
      return state
  }
}

//-----------  Exports  -----------//

export default {
  errorMessage,
  router
}
