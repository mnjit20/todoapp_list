import React from 'react';
import { StyleSheet, Text, Button, View, Platform, ListView, Keyboard, AsyncStorage } from 'react-native';

import Header from './header';
import Footer from './footer';
import Item from './item';
import UserLoginStatus from './userloginstatus';


const filterItems = (filter, items) => {
  return items.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "COMPLETED") return item.complete;
    if (filter === "ACTIVE") return !item.complete;
  })
}


class TodoScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('aaaaaaaaaaaaaaa', props.navigation);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      value: "",
      items: [],
      dataSource: ds.cloneWithRows([]),
      social_name: props.navigation.state.params.social_name,
      social_email: props.navigation.state.params.social_email,
      social_id: props.navigation.state.params.social_id,
      social_loggedIn: "",
      auth_token: props.navigation.state.params.auth_token
    }

    this.handleUpdateText = this.handleUpdateText.bind(this);
    this.handleToggleEditing = this.handleToggleEditing.bind(this);
    this.handleAddItems = this.handleAddItems.bind(this);
    this.setSource = this.setSource.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    
  }

  static navigationOptions = {
    title: 'ToDo App task'
  };

  componentWillMount = () => {
    console.log('componentWillMount==== ');
    AsyncStorage.getItem(this.state.social_name).then((json) => {
      console.log('AsyncStorage.getItem==', json, this.state.social_name)
      try {
        const items = JSON.parse(json);
        this.setSource(items, items);
      } catch (error) {

      }
    })
  }


  postTodoDataToServer(api, json) {
    console.log('==========', api, json);
    fetch('http://192.168.0.102:5000/' + api, {
      method: 'POST',
      mode: "no-cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    }).catch(function (err) {
      console.log("err from posttodo", err);
    });
  }


  // postTodoDataToServer() {
  //   return fetch('http://localhost:5000/'+api)
  //     .then((response) => response.json())
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }


  setSource(items, itemsDatasource, otherState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ...otherState
    })
    //console.log('setSource==', items, itemsDatasource);

    AsyncStorage.setItem(this.state.social_name, JSON.stringify(items));

    console.log("items", items);
    console.log('itemsDatasource', itemsDatasource)
    // aa = {
    //   "name": "manjeet",
    //   "email": "aa@aa.com",
    //   "task_name": "this is a task",
    //   "task_status": "true",
    //   "date": "2018-07-21T10:54:38.112Z",
    // }

    //    this.postTodoDataToServer('api/todo/save', aa);

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

  handleFilter(filter) {
    this.setSource(this.state.items, filterItems(filter, this.state.items), { filter });
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

    json = {
      "key": Date.now(),
      "task_name": this.state.value,
      "name": this.state.social_name,
      "email": this.state.social_email,
      "task_status": false
    }
    this.postTodoDataToServer('api/todo/save', json);
  }

  handleRemove(key) {
    const newItems = this.state.items.filter((item) => {
      console.log("item.key", item.key);
      return item.key != key
    })
    this.setSource(newItems, newItems);
  }
  handleUpdateText(key, text) {
    const newItems = this.state.items.map((item) => {
      if (item.key != key) return item;
      return {
        ...item,
        text
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }


  handleToggleEditing(key, editing) {
    const newItems = this.state.items.map((item) => {
      if (item.key != key) return item;
      return {
        ...item,
        editing
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  static navigationOptions = {
    title: 'Your ToDo App',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>
        <UserLoginStatus
          name={this.state.social_name}

        />

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
                  xyz={'aa'}
                  key={key}
                  onRemove={() => this.handleRemove(key)}
                  onUpdate={(text) => this.handleUpdate(key, text)}
                  onToggleEdit={(editing) => this.handleToggleEditing(key, editing)}
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
        paddingTop: 5
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


export default TodoScreen;