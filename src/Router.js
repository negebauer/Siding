import React from 'react'
import { Route, Switch, Redirect } from 'react-router-native'
import { ConnectedRouter } from 'react-router-redux'
import { StyleSheet, View } from 'react-native'
import { history } from './redux/store'
import { mainColor } from './config/colors'
import { routeNames, routeNameToPath as pathTo } from './routes'

import CurrentCourses from './containers/CurrentCourses'
import Course from './components/Course'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
    width: '100%',
    height: '100%',
  },
})

export default function Router() {
  return (
    <ConnectedRouter history={history}>
      <View style={styles.container}>
        <Route
          exact
          path={pathTo(routeNames.initialScreen)}
          render={() => <Redirect to={pathTo(routeNames.currentCourses)} />}
        />
        <Route
          path={pathTo(routeNames.currentCourses)}
          component={CurrentCourses}
        />
        <Route path={pathTo(routeNames.course)} component={Course} />
      </View>
    </ConnectedRouter>
  )
}
