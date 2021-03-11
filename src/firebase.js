import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAo6buXCviocE84AfGYjR2IYdcwiJh7qjw",
    authDomain: "test-project-51740.firebaseapp.com",
    projectId: "test-project-51740",
    storageBucket: "test-project-51740.appspot.com",
    messagingSenderId: "555196220759",
    appId: "1:555196220759:web:2b10e9124bd0454fc5aa12",
    measurementId: "G-HN0NXDRT4R"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;