//-----------  Imports  -----------//

import { TOKEN } from './actions'

//-----------  Definitions  -----------//

const initialState = {
  user  : null,
  token : null
}

//-----------  Reducers  -----------//

function authReducer(state = initialState, action){
  switch (action.type) {
    case TOKEN.SUCCESS:
      const { user, authenticated } = action.response.body
      return { user: user, token: authenticated }
    case TOKEN.FAILURE:
      return initialState
    default:
      return state
  }
}

//-----------  Exports  -----------//

export default authReducer
