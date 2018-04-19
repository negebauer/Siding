import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import { auth, getCourses } from './api'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 40,
    width: '60%',
    borderColor: 'gray',
    borderWidth: 1,
  },
})

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      login: false,
      loginError: undefined,
      courses: [],
    }
  }

  go = async () => {
    try {
      this.setState({ login: false, loginError: undefined })
      const login = await auth(this.state.username, this.state.password)
      this.setState({ login })
      const courses = await getCourses()
      this.setState({ courses })
    } catch (loginError) {
      this.setState({ loginError })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={password => this.setState({ password })}
        />
        <Button title="Login get courses" onPress={this.go} />
        <Text>{`Login: ${this.state.login}`}</Text>
        {this.state.loginError && (
          <Text>{`Error: ${this.state.loginError.message}`}</Text>
        )}
        {this.state.courses.map(course => (
          <Text key={course.text}>{course.text}</Text>
        ))}
      </View>
    )
  }
}
