//-----------  Imports  -----------//

import { createRequestTypes, action } from 'modules/common/actions'

//-----------  Definitions  -----------//

export const TOKEN = createRequestTypes('TOKEN')

//-----------  Actions  -----------//

export const sagaActions = {
  success: (response) => action(TOKEN.SUCCESS, { response }),
  failure: (error)    => action(TOKEN.FAILURE, { error })
}

export const viewActions = {
  requestToken: () => action(TOKEN.REQUEST)
}
