import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  LayoutAnimation,
} from 'react-native'
import LoadingView from '../components/LoadingView'
import {
  login,
  getUserData,
  getUserAuth,
  getUserLoading,
  getUserError,
} from '../redux/modules/user'
import { loadCourses } from '../redux/modules/courses'

const mapStateToProps = state => ({
  userData: getUserData(state),
  authenticated: getUserAuth(state),
  loading: getUserLoading(state),
  error: getUserError(state),
})

const mapDispatchToProps = {
  login,
  loadCourses,
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SessionGate extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
    }
  }

  componentDidMount() {
    const { userData: { username, password }, login } = this.props
    if (username && password) login(username, password)
  }

  componentDidUpdate(prevProps, snapshot) {
    if (!prevProps.authenticated && this.props.authenticated) {
      this.props.loadCourses()
    }
  }

  /**
   *  Login with the siding
   *  @author @negebauer
   *  @return {Promise}
   */
  login = () => this.props.login(this.state.username, this.state.password)

  render() {
    const { authenticated, loading, error } = this.props

    if (loading) {
      return <LoadingView text="Ingresando al siding" />
    }

    if (authenticated) return this.props.children

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
        <Button title="Login" onPress={this.login} />
        {error && <Text>{`Error: ${error.message}`}</Text>}
      </View>
    )
  }
}

SessionGate.propTypes = {
  authenticated: PropTypes.bool,
  loading: PropTypes.bool,
  login: PropTypes.func,
  error: PropTypes.object,
}

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
