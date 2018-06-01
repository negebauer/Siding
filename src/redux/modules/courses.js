import { merge } from 'lodash/fp/object'
import { normalize, denormalize } from 'normalizr'
import { createSelector } from 'reselect'
import { loadCourses as apiLoadCourses } from '../../utils/api'
import { SIDING_SEMESTER, SIDING_YEAR, sidingDateId } from '../../utils/date'
import { courseSchema } from '../schemas'
import { getEntities } from './entities'

// Actions
export const LOAD_COURSES = 'siding/courses/LOAD_COURSES'
export const LOAD_COURSES_PENDING = `${LOAD_COURSES}_PENDING`
export const LOAD_COURSES_FULFILLED = `${LOAD_COURSES}_FULFILLED`
export const LOAD_COURSES_REJECTED = `${LOAD_COURSES}_REJECTED`

// Initial state
const initialState = {
  allCourses: [],
  coursesDate: {},
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
        allCourses: action.payload.result,
        coursesDate: merge(state.coursesDate, action.payload.coursesDate),
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
export function loadCourses(semester, year) {
  return dispatch =>
    dispatch({
      type: LOAD_COURSES,
      payload: apiLoadCourses(semester, year).then(r => {
        const payload = normalize(r, [courseSchema])
        return {
          ...payload,
          coursesDate: { [sidingDateId(semester, year)]: payload.result },
        }
      }),
    })
}

// Selectors
export function getCoursesState(state) {
  return state.courses
}

export function getCoursesDate(
  state,
  props = { semester: SIDING_SEMESTER, year: SIDING_YEAR }
) {
  return state.courses.coursesDate[sidingDateId(props.semester, props.year)]
}

export const getCoursesDateList = createSelector(
  getCoursesDate,
  getEntities,
  (courses, entities) => denormalize(courses, [courseSchema], entities)
)
