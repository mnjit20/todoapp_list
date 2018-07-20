// import React from 'react';
// import { StyleSheet, Text, View, Platform, ListView, Keyboard } from 'react-native';
// import Header from './header';
// import Footer from './footer';
// import Item from './item';
// import FBLogin from './fb_login';
// import { createStackNavigator } from 'react-navigation';




import React, { Component } from 'react';
import { Text, Navigator, TouchableHighlight } from 'react-native';

import {
  createStackNavigator,
} from 'react-navigation';

import loginscreen from './loginscreen';
import TodoScreen from './todoscreen';
const App = createStackNavigator({
  Login: { screen: loginscreen },
  ToDoList: { screen: TodoScreen },
});

export default App;
