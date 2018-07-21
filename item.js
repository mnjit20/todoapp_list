import React, { Component } from 'react'
import { View, Text, StyleSheet, Switch, TouchableOpacity, TextInput } from "react-native";

class Item extends Component {

  // Component for creating list of to do task
  render() {
    const { complete } = this.props;

    const textComponent = (
      <View style={styles.textWrap}>
        <Text style={[styles.text, complete && styles.complete]}>{this.props.text}</Text>
      </View>
    )


    const updateComponent = (
      <TouchableOpacity onPress={() => this.props.onToggleEdit(true)}>
        <Text style={styles.update}>Update</Text>
      </TouchableOpacity>
    )

    const removeButton = (
      <TouchableOpacity onPress={this.props.onRemove}>
        <Text style={styles.destroy}>Delete</Text>
      </TouchableOpacity>
    )

    const editingComponet = (
      <View style={styles.textWrap}>
        <TextInput
          onChangeText={this.props.onUpdate}
          autoFocus
          value={this.props.text}
          style={styles.input}
        />
      </View>
    )

    console.log('this.props item ', this.props);
    return (
      <View style={styles.container}>
        <Switch
          value={complete}
          onValueChange={this.props.onComplete}
        />
        {this.props.editing ? editingComponet : textComponent}
        {this.props.editing ? updateComponent : removeButton}
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  textWrap: {
    //flex: 1,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 24,
    color: "#4d4d4d",

  },
  complete: {
    textDecorationLine: "line-through"
  }, destroy: {
    fontSize: 10,
    color: '#fff',
    padding: 5,
    backgroundColor: "#dc3545",
    borderColor: "#dc3545",
    borderWidth: 1
  },
  update: {
    fontSize: 10,
    color: '#fff',
    padding: 5,
    borderColor: "#28a745",
    backgroundColor: "#28a745",
    borderWidth: 1
  },
  input: {
    height: 100,
    flex: 1,
    fontSize: 24,
    padding: 0,
    color: "#4d4d4d"
  }
})
export default Item;