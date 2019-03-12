import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/dashboard';
import Login from './components/login';
import {createTodo, removeTodo, loginWithFireBase, logoutWithFireBase} from './services/firebaseService';
import { isNull } from 'util';
import firebase from './configs/firebaseConfig';
import config from './configs/firebaseCollectionConfig';

class App extends Component {

  state = {
    text:"",
    todos:[],
    user: isNull,
    isAuthenticated: false,
  };

  handleChange = e => {
    this.setState({ text: e.currentTarget.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    createTodo({text:this.state.text});
  };

  handleRemove = todoId => {
    removeTodo(todoId);
  };

  handleLogin = () => {
    loginWithFireBase();
  };

  handleLogout = () => {
    logoutWithFireBase();
  };
  componentDidMount() {
  firebase.database().ref(config.TODO_COLLECTION)
  .on('value',snapshot => {
  console.log('Read todo')
  console.log(snapshot.key, snapshot.val())
  const newArray = [];
  snapshot.forEach(childSnapshot => {
    newArray.push({
      id: childSnapshot.key,
      ...childSnapshot.val()
    });
  });
  this.setState({todos: newArray});
  })
  firebase.auth().onAuthStateChanged(user => {
    user ? (this.setState({
      user: user.displayName,
      isAuthenticated:true,
      })) : (this.setState({
        user: null,
        isAuthenticated: false,
      }));
  });
  };

  render() {
    return (
      <div className="App">
        <h1>Welcome to React Fire Todos</h1>
        {
        this.state.isAuthenticated ? 
          (<Dashboard 
              todos={this.state.todos}
              textValue={this.state.text}
              handleChange={this.handleChange}
              handleRemove={this.handleRemove}
              handleSubmit={this.handleSubmit}
              handleLogout={this.handleLogout}
              />)
              : ( <Login 
                    handleLogin={this.handleLogin}
                  />)
              }
      </div>
    );
  }
}

export default App;
