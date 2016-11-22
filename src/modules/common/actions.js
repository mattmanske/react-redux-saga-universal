//-----------  Remote Definitions  -----------//

export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

//-----------  Remote Actions  -----------//

export function createRequestTypes(base){
  const typeArr = [REQUEST, SUCCESS, FAILURE]
  const res = {}

  typeArr.forEach(type => res[type] = `${base}_${type}`)
  return res
}

export function action(type, payload = {}){
  return { type, ...payload }
}

//-----------  Navigation Definitions  -----------//

export const NAVIGATE            = 'NAVIGATE'
export const UPDATE_ROUTER_STATE = 'UPDATE_ROUTER_STATE'
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

//-----------  Navigation Actions  -----------//

export const updateRouterState = (state) => {
  action(UPDATE_ROUTER_STATE, { state })
}

export const navigate = (pathname) => {
  action(NAVIGATE, { pathname })
}

export const resetErrorMessage = () => {
  action(RESET_ERROR_MESSAGE)
}
