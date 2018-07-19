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

import HomeScreen from './homescreen';
import ProfileScreen from './profilescreen';
const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
});

export default App;
