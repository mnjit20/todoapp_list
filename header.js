import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, } from 'react-native';

class Header extends Component {

  render() {
    return (
      <View style={styles.header}>
        <TextInput value={this.props.value}
          onChangeText={this.props.onChange}
          onSubmitEditing={this.props.onAddItem}
          placeholder="What you wanna do, lets add it here."
          blurOnSubmit={false}
          returnKeyType="done"
          style={styles.input}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f5f5f5"
  }, input: {
    flex: 1,
    height: 50
  },

  userinfo_container: {
    paddingTop: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"

  }
})
export default Header;