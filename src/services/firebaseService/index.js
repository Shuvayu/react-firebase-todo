import firebase from '../../configs/firebaseConfig';
import config from '../../configs/firebaseCollectionConfig';


export function createTodo(todo) {
 firebase
 .database()
 .ref(config.TODO_COLLECTION)
 .push(todo)
 .then(() => console.log('Todo Written Successfully.'))
 .catch(error => console.log('Something went wrong : ', error));
};

export function readTodo() {
  const newArray = [];
  firebase.database().ref(config.TODO_COLLECTION)
  .on('value',snapshot => {
  console.log('Read todo')
  console.log(snapshot.key, snapshot.val())
  snapshot.forEach(childSnapshot => {
    newArray.push({
      id: childSnapshot.key,
      ...childSnapshot.val()
    });
  });
  })
  return newArray;
 };

 export function removeTodo(todoId) {
  firebase
  .database()
  .ref(`${config.TODO_COLLECTION}/${todoId}`)
  .remove()
  .then(() => console.log('Todo Deleted Successfully.'))
  .catch(error => console.log('Something went wrong : ', error));
 };

 export function loginWithFireBase() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
  .auth()
  .signInWithPopup(provider)
  .then(() => console.log('Login Successful'))
  .catch(error => console.log('Something went wrong : ', error));
 };

 export function logoutWithFireBase() {
  firebase
    .auth()
    .signOut()
    .then(() => console.log('LogOut Successful'))
    .catch(error => console.log('Something went wrong : ', error));
 };

export default {};