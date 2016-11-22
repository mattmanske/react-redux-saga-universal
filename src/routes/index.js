//-----------  Imports  -----------//

import AppRoute       from 'routes/AppRoute'
import HomeRoute      from 'routes/HomeRoute'
import LoginRoute     from 'routes/LoginRoute'

import AuthRoute      from 'routes/AuthRoute'
import DashboardRoute from 'routes/DashboardRoute'

import NotFoundRoute  from 'routes/NotFoundRoute'

//-----------  Helpers  -----------//

function checkAuth(store, nextState, replace){
  let { loggedIn } = store.getState()

  store.dispatch(clearError())

  if (nextState.location.pathname !== '/dashboard'){
    if (loggedIn){
      if (nextState.location.state && nextState.location.pathname)
        replace(nextState.location.pathname)
      else
        replace('/')
    }
  } else {
    if (!loggedIn) {
      if (nextState.location.state && nextState.location.pathname)
        replace(nextState.location.pathname)
      else
        replace('/')
    }
  }
}

//-----------  Routing Definitions  -----------//

export const getRoutes = (store) => ([
  {
    path        : '/',
    component   : AppRoute,
    indexRoute  : { component: HomeRoute },
    childRoutes : [
      LoginRoute
    ]
  },{
    path        : '/dashboard',
    component   : AuthRoute,
    indexRoute  : { component: DashboardRoute },
    // onEnter     : (nextState, replace) => {
    //   checkAuth(store, nextState, replace)
    // }
  },{
    path      : '*',
    component : NotFoundRoute
  }
])

//-----------  Exports  -----------//

export default getRoutes
