import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCScI7au6PRjzlcfsFyWhBGhXEg1XT1qTU",
  authDomain: "chatapp-a6daa.firebaseapp.com",
  projectId: "chatapp-a6daa",
  storageBucket: "chatapp-a6daa.appspot.com",
  messagingSenderId: "79166325766",
  appId: "1:79166325766:web:8c0d6a182989c94b0c6f87",
  measurementId: "G-HLNNCSNPCG"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);


  return (
    <div className="App">
      <header className="App-header">
        
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField: 'id'});
}

export default App;
