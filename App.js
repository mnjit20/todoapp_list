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
