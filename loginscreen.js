import React, { Component } from 'react'

import { StyleSheet, Text, Button, View, Platform, ListView, Keyboard, TouchableOpacity } from 'react-native';

import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';


class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('====inside constructto');

    this.state = {
      social_name: "manjeet__",
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



    navigate('ToDoList', {
      social_name: 'Manjeet',
      social_id: "10919102982992",
      social_email: "mnjit1989@gmail.com"
    });



    // this.setState({
    //   social_name: 'manjeet verma',
    //   social_id: 'json.id',
    //   social_loggedIn: true,
    //   social_email: 'json.email'

    // })

    // fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
    //   .then((response) => { return response.json() })
    //   .then((json) => {
    //     console.table(json);


    //     navigate('ToDoList', {
    //       social_name: json.name,
    //       social_id: json.id,
    //       social_loggedIn: true,
    //       social_email: json.email,
    //       auth_token: accessToken
    //     });


    //     // this.setState({
    //     //   auth_token: accessToken,
    //     //   social_name: json.name,
    //     //   social_id: json.id,
    //     //   social_loggedIn: true,
    //     //   social_email: json.email
    //     // })


    //     console.log(this.state.social_name);



    //   })
    //   .catch((err) => {
    //     console.log('ERROR GETTING DATA FROM FACEBOOK', err);
    //   })
  }

  _fbAuth() {
    var that = this;


    console.log('called');

    that.initUser('aaaa');


    // LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(function (result) {
    //   if (result.isCancelled) {
    //     alert(JSON.stringfy(result));
    //     alert("Login Cancelled");
    //     that.setState({
    //       error: 'Login Canelled by User'
    //     })
    //   } else {
    //     AccessToken.getCurrentAccessToken().then(
    //       (data) => {
    //         const { accessToken } = data;
    //         //alert(data.accessToken.toString())
    //         console.log('data', data);
    //         //console.log('............. ', that.state.user_name);
    //         that.initUser(accessToken);
    //       }
    //     )
    //   }
    // }, function (error) {
    //   alert("some error occurred!!");
    //   that.setState({
    //     error: 'Something went wrong'
    //   })
    // })
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


export default LoginScreen;