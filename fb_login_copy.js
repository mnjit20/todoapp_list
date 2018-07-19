import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
//import FBSDK from require('react-native-fbsdk');
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';

//class for facebook login
class FBLogin extends Component {

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

    this.handleSocialLoginSubmit = this.handleSocialLoginSubmit.bind(this);
    this.showUserStatus = this.showUserStatus.bind(this);

  }

  handleSocialLoginSubmit(token) {
    this.setState({
      auth_token: token
    })
    console.log('this is the token', token);
  }

  showUserStatus() {
    console.log(' State value ====================================== ');
    console.log(this.state.social_name);
  }


  initUser(token) {
    console.log('init working');
    var user = {};

    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
      .then((response) => { return response.json() })
      .then((json) => {
        // Some user object has been set up somewhere, build that user here
        console.table(json);

        this.setState({
          auth_token: token,
          social_name: json.name,
          social_id: json.id,
          social_loggedIn: true,
          social_email: json.email
        })


        this.showUserStatus();
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
            console.log('............. ', that.state.user_name);
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


  // render() {
  //   return (
  //     <View>
  //       <LoginButton
  //         publishPermissions={["publish_actions"]}
  //         onLoginFinished={
  //           (error, result) => {
  //             if (error) {
  //               alert("login has error: " + result.error);
  //             } else if (result.isCancelled) {
  //               alert("login is cancelled.");
  //             } else {
  //               AccessToken.getCurrentAccessToken().then(
  //                 (data) => {
  //                   alert(data.accessToken.toString())
  //                 }
  //               )
  //             }
  //           }
  //         }
  //         onLogoutFinished={() => alert("logout.")} />
  //     </View>
  //   )
  // }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this._fbAuth.bind(this)}>
          <Text style={style.button}>
            Login With Facebook
         </Text>
        </TouchableOpacity>
      </View>
    );
  }

}


const style = StyleSheet.create({
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'

  }
});
export default FBLogin;
