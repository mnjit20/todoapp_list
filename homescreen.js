import React, { Component } from 'react'

import { StyleSheet, Text, Button, View, Platform, ListView, Keyboard, TouchableOpacity } from 'react-native';

import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('====inside constructto');

    this.state = {
      social_name: "",
      social_id: "",
      social_loggedIn: "",
      social_email: "",
      auth_token: "",
      error: ''
    }

    //    this.handleSocialLoginSubmit = this.handleSocialLoginSubmit.bind(this);
    //  this.showUserStatus = this.showUserStatus.bind(this);
    //this.initUser = this.initUser.bind(this);
  }

  static navigationOptions = {
    title: 'ToDo App',
  };

  initUser(accessToken) {
    var that = this;
    const { navigate } = this.props.navigation;
    console.log('this === accessToken ', accessToken);

    console.log('init working');
    var user = {};

    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
      .then((response) => { return response.json() })
      .then((json) => {
        // Some user object has been set up somewhere, build that user here
        console.table(json);

        this.setState({
          auth_token: accessToken,
          social_name: json.name,
          social_id: json.id,
          social_loggedIn: true,
          social_email: json.email
        })
        console.log(this.state.social_name);

        //this.showUserStatus();
        navigate('Profile', {
          social_name: json.name,
          social_id: json.id,
          social_loggedIn: true,
          social_email: json.email
        });

      })
      .catch((err) => {
        console.log('ERROR GETTING DATA FROM FACEBOOK', err);
      })
  }

  _fbAuth() {
    var that = this;


    console.log('called');


    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(function (result) {
      if (result.isCancelled) {
        alert(JSON.stringfy(result));
        alert("Login Cancelled");
        that.setState({
          error: 'Login Canelled by User'
        })
      } else {
        AccessToken.getCurrentAccessToken().then(
          (data) => {
            const { accessToken } = data;
            //alert(data.accessToken.toString())
            console.log('data', data);
            //console.log('............. ', that.state.user_name);
            that.initUser(accessToken);
          }
        )
      }
    }, function (error) {
      alert("some error occurred!!");
      that.setState({
        error: 'Something went wrong'
      })
    })
  }


  render() {
    return (
      <Button
        title="Click to Login using Facebook"
        onPress={this._fbAuth.bind(this)}

      />
    );
  }
}


export default HomeScreen;