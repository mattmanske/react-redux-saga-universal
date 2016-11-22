//-----------  Imports  -----------//

import { takeLatest }         from 'redux-saga'
import { put, call }          from 'redux-saga/effects'

import { tokenAPI }           from 'services/api'
import { TOKEN, sagaActions } from 'modules/auth/actions'

//-----------  Subroutines  -----------//

function* fetchToken(){
  try {
    const res = yield call(tokenAPI)
    yield put(sagaActions.success(res))
  } catch (err) {
    yield put(sagaActions.failure(err))
  }
}

//-----------  Watchers  -----------//

function* watchTokenRequest() {
  yield* takeLatest(TOKEN.REQUEST, fetchToken)
}

export default {
  watchTokenRequest
}
