import React from 'react';
import { StyleSheet, Text, Button, View, Platform, ListView, Keyboard } from 'react-native';

import Header from './header';
import Footer from './footer';
import Item from './item';


class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('props from profile ', props);
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



  static navigationOptions = {
    title: 'ToDo App',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItems}
          onChange={(value) => this.setState({ value })}
        />


        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({ key, ...value }) => {
              return (
                <Item

                  key={key}
                  onComplete={(complete) => this.handleToggleComplete(key, complete)}
                  {...value}
                />
              )
            }}
            renderSeparator={(sectionId, rowId) => {
              return <View key={rowId} style={styles.separator} />
            }}
          />

        </View>
        <Footer />

      </View>



      // <Button
      //   title="This is profile screen"
      //   onPress={() =>
      //     navigate('Profile', { name: 'Jane' })
      //   }
      // />



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


export default ProfileScreen;