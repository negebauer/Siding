import { merge } from 'lodash/fp/object'
import { REHYDRATE } from 'redux-persist'
import { createSelector } from 'reselect'
import { SIDING_AUTH_FAILED } from '../../utils/api'

// Actions
export const LOGIN = 'siding/user/LOGIN'
export const LOGIN_PENDING = `${LOGIN}_PENDING`
export const LOGIN_FULFILLED = `${LOGIN}_FULFILLED`
export const LOGIN_REJECTED = `${LOGIN}_REJECTED`

// Initial state
const initialState = {
  username: '',
  password: '',
  authenticated: false,
  loading: false,
  error: undefined,
}

// Reducer
export default function reducer(state = initialState, action) {
  if (action.error && action.payload === SIDING_AUTH_FAILED) {
    return merge(state, {
      authenticated: false,
      loading: false,
      error: action.payload,
    })
  }
  switch (action.type) {
    case REHYDRATE:
      if (!action.payload) return initialState
      return merge(initialState, {
        ...action.payload.user,
        authenticated: false,
        loading: false,
        error: undefined,
      })
    case LOGIN_PENDING:
      return merge(state, {
        authenticated: false,
        loading: true,
        error: undefined,
      })
    case LOGIN_FULFILLED:
      return merge(state, {
        ...action.payload,
        authenticated: true,
        loading: false,
        error: undefined,
      })
    default:
      return state
  }
}

// Action creators
export function login(username, password) {
  return (dispatch, getState, { api }) =>
    dispatch({
      type: LOGIN,
      payload: api.logout().then(() => api.auth(username, password)),
    })
}

// Selectors
export function getUser(state) {
  return state.user
}

export const getUserData = createSelector(getUser, user => ({
  username: user.username,
  password: user.password,
}))
export const getUserAuth = createSelector(getUser, user => user.authenticated)
export const getUserLoading = createSelector(getUser, user => user.loading)
export const getUserError = createSelector(getUser, user => user.error)
export const getUsername = createSelector(getUser, user => user.username)
