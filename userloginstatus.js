import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


class UserLoginStatus extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View styles={styles.container}>
        <View styles={styles.buttons}>
          <TouchableOpacity>
            <Text> Hi {this.props.name}</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text> Logout </Text>
          </TouchableOpacity>


        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  buttons: {
    flexDirection: "row"
  }
})
export default UserLoginStatus;