import { combineReducers } from 'redux'

import courses from './modules/courses'
import entities from './modules/entities'
import user from './modules/user'

const reducers = combineReducers({
  courses,
  entities,
  user,
})

export default reducers
