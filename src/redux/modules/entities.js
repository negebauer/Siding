import { merge } from 'lodash/fp/object'

// Actions
import { LOAD_COURSES_FULFILLED } from './courses'

// Initial state
const initialState = {
  courses: {},
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COURSES_FULFILLED:
      return merge(state, { courses: action.payload.entities.courses })
    default:
      return state
  }
}

// Selectors
export function getEntities(state) {
  return state.entities
}
