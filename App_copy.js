import React from 'react';
import { StyleSheet, Text, View, Platform, ListView, Keyboard } from 'react-native';
import Header from './header';
import Footer from './footer';
import Item from './item';
import FBLogin from './fb_login';
import { createStackNavigator } from 'react-navigation';


class App extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      value: "",
      items: [],
      dataSource: ds.cloneWithRows([]),
      username: "",
      email: "",
      accesstoken: ""
    }

    this.handleAddItems = this.handleAddItems.bind(this);
    this.setSource = this.setSource.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
  }

  setSource(items, itemsDatasource, otherState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ...otherState
    })
  }

  handleToggleComplete(key, complete) {
    const newItems = this.state.items.map((item) => {
      if (item.key != key) return item;
      return {
        ...item,
        complete
      }
    })
    this.setSource(newItems, newItems);
    console.table(newItems);

  }


  handleAddItems() {
    if (!this.state.value) return;
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ]
    this.setSource(newItems, newItems, { value: "" });
    console.table(newItems);
  }

  render() {
    return (

      <View style={styles.mainContainer}>
        <Text style={styles.title}> Login using facebook </Text>

        <FBLogin />
      </View>

      // <View style={styles.container}>
      //   <Header
      //     value={this.state.value}
      //     onAddItem={this.handleAddItems}
      //     onChange={(value) => this.setState({ value })}
      //   />
      //   <FBLogin />
      //   <View style={styles.content}>
      //     <ListView
      //       style={styles.list}
      //       enableEmptySections
      //       dataSource={this.state.dataSource}
      //       onScroll={() => Keyboard.dismiss()}
      //       renderRow={({ key, ...value }) => {
      //         return (
      //           <Item

      //             key={key}
      //             onComplete={(complete) => this.handleToggleComplete(key, complete)}
      //             {...value}
      //           />
      //         )
      //       }}
      //       renderSeparator={(sectionId, rowId) => {
      //         return <View key={rowId} style={styles.separator} />
      //       }}
      //     />

      //   </View>
      //   <Footer />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        backgroundColor: 'grey',
      },
      android: {
        backgroundColor: '#fff',
        paddingTop: 50
      },
    })
  },
  content: {
    flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center'
  },
  list: {
    backgroundColor: '#fff'
  }, separator: {
    borderWidth: 1,
    borderColor: "#f5f5f5"
  },



  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },

  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  }
});

export default App;
