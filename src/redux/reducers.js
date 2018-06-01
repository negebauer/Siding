import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import courses from './modules/courses'
import entities from './modules/entities'
import user from './modules/user'

const reducers = combineReducers({
  courses,
  entities,
  router: routerReducer,
  user,
})

export default reducers
