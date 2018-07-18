import React, { Component } from 'react'
import { Text, View } from 'react-native'
//import FBSDK from require('react-native-fbsdk');
import { LoginButton, AccessToken } from 'react-native-fbsdk';
// const {
//   LoginButton,
//   AccessToken
// } = FBSDK;


class FBLogin extends Component {
  render() {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")} />
      </View>
    )
  }
}

export default FBLogin;
