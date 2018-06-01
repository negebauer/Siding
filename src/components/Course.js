import React from 'react'
import { View, Text } from 'react-native'

export default function Course(props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{`Estas viendo el curso con id: ${props.match.params.id}`}</Text>
    </View>
  )
}
