//-----------  Imports  -----------//

import { fork, join }        from 'redux-saga/effects'

import { watchNavigate }     from 'modules/common/sagas'
import { watchTokenRequest } from 'modules/auth/sagas'

//-----------  Wait All  -----------//

export const waitAll = (sagas) => function* genTasks(){
  const tasks = yield sagas.map(([saga, ...params]) => fork(saga, ...params))
  yield tasks.map(join)
}

//-----------  Exports  -----------//

export default function* rootSaga(){
  yield [
    fork(watchNavigate),
    fork(watchTokenRequest)
  ]
}
