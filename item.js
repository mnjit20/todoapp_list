import React, { Component } from 'react'
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";

class Item extends Component {

  // Component for creating list of to do task
  render() {
    const { complete } = this.props;
    console.log('this.props item ', this.props);
    return (
      <View style={styles.container}>
        <Switch
          value={complete}
          onValueChange={this.props.onComplete}
        />
        <View style={styles.textWrap}>
          <Text style={[styles.text, complete && styles.complete]}>{this.props.text}</Text>
        </View>
        <TouchableOpacity onPress={this.props.onRemove}>
          <Text style={styles.destroy}>X</Text>
        </TouchableOpacity>
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
    fontSize: 20,
    color: '#cc9a9a'
  }
})
export default Item;