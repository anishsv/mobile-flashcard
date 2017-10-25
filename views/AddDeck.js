import React, {Component} from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import { AppLoading } from 'expo'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

// routing
import { NavigationActions } from 'react-navigation'

// helper functions
import utils from '../helpers/utils'

// styles
const styles: StyleSheet.Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  btn: {
    backgroundColor: 'steelblue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    margin: 5
  },

  btnText: {
    color: 'white'
  }
})

export default class DeckDetails extends Component {
  state = {
    name: '',
    errorMessage: false
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Add new deck',
  })

  saveDeck() {
    if (this.state.name) {
      utils.saveDeck(
        this.state.name
      ).then(
        ({title, id}) => {
          this.props.navigation.state.params.updater()
          this.props.navigation.goBack()
          this.props.navigation.navigate(
            'DeckDetails',
            {title, id, updater: () => this.props.navigation.state.params.updater()}
          )
        }
      )
    }else{
      this.setState({ errorMessage: true })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={{width: 250, margin: 5}}>
          <FormLabel>Name</FormLabel>
        </View>
        <View style={{width: 250, margin: 5}}>
          <FormInput
            style={{ borderWidth:1, height:30, padding: 5}}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            placeholder='Deck name'
          />
          <FormValidationMessage>
            {this.state.errorMessage ? 'This field is required': ''}
          </FormValidationMessage>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.saveDeck()}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}
