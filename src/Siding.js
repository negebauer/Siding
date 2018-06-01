import React from 'react'
import { AsyncStorage, StatusBar } from 'react-native'
import { Provider, connect } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { PersistGate } from 'redux-persist/integration/react'

import store, { persistor } from './redux/store'
import SessionGate from './containers/SessionGate'
import LoadingView from './components/LoadingView'
import Router from './Router'

/**
 *  Main react native app component
 *  @author @negebauer
 *  @constructor
 */
export default function Siding() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingView />} persistor={persistor}>
        <StatusBar barStyle="default" />
        <SessionGate>
          <Router />
        </SessionGate>
      </PersistGate>
    </Provider>
  )
}
