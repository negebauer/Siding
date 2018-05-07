import { merge } from 'lodash/fp/object'
import { normalize, denormalize } from 'normalizr'
import { createSelector } from 'reselect'
import { courseSchema } from '../schemas'
import { getEntities } from './entities'

// Actions
export const LOAD_COURSES = 'siding/courses/LOAD_COURSES'
export const LOAD_COURSES_PENDING = `${LOAD_COURSES}_PENDING`
export const LOAD_COURSES_FULFILLED = `${LOAD_COURSES}_FULFILLED`
export const LOAD_COURSES_REJECTED = `${LOAD_COURSES}_REJECTED`

// Initial state
const initialState = {
  courses: [],
  loading: false,
  error: undefined,
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COURSES_PENDING:
      return merge(state, {
        loading: true,
        error: undefined,
      })
    case LOAD_COURSES_FULFILLED:
      return merge(state, {
        courses: action.payload.result,
        loading: false,
        error: undefined,
      })
    case LOAD_COURSES_REJECTED:
      return merge(state, {
        loading: false,
        error: action.payload,
      })
    default:
      return state
  }
}

// Action creators
export function loadCourses() {
  return (dispatch, getState, { api }) =>
    dispatch({
      type: LOAD_COURSES,
      payload: api.loadCourses().then(r => normalize(r, [courseSchema])),
    })
}

// Selectors
export function getCourses(state) {
  return state.courses
}

export const getCoursesList = createSelector(
  getCourses,
  getEntities,
  (courses, entities) => denormalize(courses.courses, [courseSchema], entities)
)
export const getCoursesLoading = createSelector(
  getCourses,
  courses => courses.loading
)
export const getCoursesError = createSelector(
  getCourses,
  courses => courses.error
)
