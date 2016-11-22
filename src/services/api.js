//-----------  Imports  -----------//

import * as popsicle from 'popsicle'
import status        from 'popsicle-status'
import auth          from 'popsicle-basic-auth'

//-----------  Definitions  -----------//

const API_BASE        = 'https://httpbin.org/basic-auth/user/passwd'
const CONSUMER_KEY    = 'user'
const CONSUMER_SECRET = 'passwd'

//-----------  API  -----------//

export function tokenAPI(){
  return popsicle.get(API_BASE)
    .use(auth(CONSUMER_KEY, CONSUMER_SECRET))
    .use(popsicle.plugins.parse(['json']))
    .use(status())
}
