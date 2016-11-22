//-----------  Imports  -----------//

import merge               from 'lodash/merge'

import React               from 'react'
import { render }          from 'react-dom'
import { getStoredState,
         createPersistor } from 'redux-persist'

import getRoutes           from 'routes'
import rootSaga            from 'modules/rootSaga'
import AppRoot             from 'containers/AppRoot'
import configureStore      from 'store/configureStore'
import history             from 'services/history'

import config              from './config'

//-----------  Definitions  -----------//

const MOUNT_NODE = document.getElementById('content')

//-----------  Render  -----------//

async function renderClient(){

  const persistConfig = { whitelist: [] }

  let initialState = window.__data // initial state passed down by server to client

  try {
    const restoredState = await getStoredState(persistConfig)
    initialState = merge({}, initialState, restoredState)
  } catch (error) {
    console.log('error restoring state:', error)
  }

  const store     = configureStore(history, initialState)
  const persistor = createPersistor(store, persistConfig)

  store.runSaga(rootSaga)

  render(
    <AppRoot
      store={store}
      history={history}
      routes={getRoutes(store)}
      isServer={false}
    />,
    MOUNT_NODE
  )

  if (process.env.NODE_ENV !== 'production')
    window.React = React
}

renderClient()
