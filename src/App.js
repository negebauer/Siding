import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { mainColor, mainColorAlternate } from './config/colors'
import Courses from './containers/Courses'

export default function App() {
  return (
    <View style={styles.container}>
      <Courses />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
})
