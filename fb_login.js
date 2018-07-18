import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
//import FBSDK from require('react-native-fbsdk');
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';

// const {
//   LoginButton,
//   AccessToken
// } = FBSDK;



class FBLogin extends Component {

  _fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile']).then(function (result) {
      if (result.isCancelled) {
        console.log("Login Cancelled");
      } else {
        console.log("Login Success permission granted:" + result.grantedPermissions);
      }
    }, function (error) {
      console.log("some error occurred!!");
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
        <TouchableOpacity onPress={this._fbAuth}>
          <Text>
            Login With Facebook
         </Text>
        </TouchableOpacity>
      </View>
    );
  }

}

export default FBLogin;
