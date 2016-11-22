//-----------  Imports  -----------//

import { combineReducers }        from 'redux'
import { reducer as formReducer } from 'redux-form'

import { errorMessage, router }   from 'modules/common/reducers'
import authReducer                from 'modules/auth/reducers'

//-----------  Reducer  -----------//

const rootReducer = combineReducers({
  form   : formReducer,
  auth   : authReducer,
  errors : errorMessage,
  router
})

//-----------  Exports  -----------//

export default rootReducer
