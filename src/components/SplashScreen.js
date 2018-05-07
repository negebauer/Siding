import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { mainColor } from '../config/colors'

/**
 *  A generic loading view
 *  @author @negebauer
 *  @constructor
 */
export default function SplashScreen({ text, size }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
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
