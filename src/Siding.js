import React from 'react'
import { AsyncStorage } from 'react-native'
import { Provider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import Session from './containers/Session'
import SplashScreen from './components/SplashScreen'
import Api from './utils/api'
import configureStore from './redux/store'

/**
 *  An instance of the siding api client
 *  @type {Api}
 */
const api = new Api()

/**
 *  Default initial state
 *  @type {Object}
 */
const initialState = {}

/**
 *  The redux store with its persistor
 *  @type {Object}
 */
const { store, persistor } = configureStore(initialState, { api })

/**
 *  Main react native app component
 *  @author @negebauer
 *  @constructor
 */
export default function Siding() {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <Session>
          <App />
        </Session>
      </PersistGate>
    </Provider>
  )
}
