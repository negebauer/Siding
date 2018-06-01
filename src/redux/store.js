import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createMemoryHistory'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from './reducers'

const persistConfig = {
  key: 'root',
  blacklist: ['router'],
  storage,
}

const initialState = {}

export const history = createHistory()

const middleware = [routerMiddleware(history), thunk, promiseMiddleware()]

const shouldLog = process.env.NODE_ENV !== 'production'
if (shouldLog) middleware.push(logger)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  persistReducer(persistConfig, reducers),
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
)

export const persistor = persistStore(store)

export default store
