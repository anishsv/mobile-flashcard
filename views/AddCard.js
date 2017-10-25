import React, {Component} from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import { AppLoading } from 'expo'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

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
    question: '',
    answer: '',
    errorMessage: false
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Add new card',
  })

  saveCard() {
    if (this.state.question && this.state.answer) {
      utils.saveCard(
        this.props.navigation.state.params.id,
        this.state.question,
        this.state.answer
      ).then(
        () => {
          this.props.navigation.state.params.updater(true)
        }
      )
      this.props.navigation.goBack()
    }else{
      this.setState({ errorMessage: true })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={{width: 250, margin: 5}}>
          <FormLabel>Question</FormLabel>
        </View>
        <View style={{width: 250, margin: 5}}>
          <FormInput
            style={{borderWidth:1, height:30, padding: 5}}
            onChangeText={(question) => this.setState({question})}
            value={this.state.question}
            placeholder='Enter your question'
          />
        </View>
        <View style={{width: 250, margin: 5}}>
          <FormLabel>Answer</FormLabel>
        </View>
        <View style={{width: 250, margin: 5}}>
          <FormInput
            style={{borderWidth:1, height:30, padding: 5}}
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
            placeholder='Enter your answer'
          />
        </View>
        <FormValidationMessage>
            {this.state.errorMessage ? 'Both fields are required': ''}
          </FormValidationMessage>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.saveCard()}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}
