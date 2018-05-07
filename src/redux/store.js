import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from './reducers'

const persistConfig = {
  key: 'root',
  storage,
}

export default function configureStore(initialState = {}, { api } = {}) {
  const middleware = [thunk.withExtraArgument({ api }), promiseMiddleware()]

  const shouldLog = process.env.NODE_ENV !== 'production'
  if (shouldLog) middleware.push(logger)

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const enhancer = composeEnhancers(applyMiddleware(...middleware))
  const persistedReducer = persistReducer(persistConfig, reducers)
  const store = createStore(persistedReducer, initialState, enhancer)
  const persistor = persistStore(store)

  return { store, persistor }
}
