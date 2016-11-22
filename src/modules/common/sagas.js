//-----------  Imports  -----------//

import { take }     from 'redux-saga/effects'

import history      from 'services/history'
import * as actions from './actions'

//-----------  Watchers  -----------//

function* watchNavigate(){
  while (true){
    const { pathname } = yield take(actions.NAVIGATE)
    yield history.push(pathname)
  }
}

//-----------  Exports  -----------//

export default { watchNavigate }
