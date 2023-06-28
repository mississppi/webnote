import React, { useEffect, useState } from 'react'
import Navi from './Navi'
import Main from './Main'
import uuid from 'react-uuid'
import { auth } from '../firebase'
import {doc, addDoc, collection, deleteDoc, getDocs, query, where} from "firebase/firestore"
import {db} from "../firebase"
import "./Home.css";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
const Home = () => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        setUser(user);
        fetchNoteList(user.email);
      } else {

      }
    });

    return () => {
      unsubscribe();
    }
  },[]);

  const fetchNoteList = async(userEmail) => {
    try{
      const q = query(collection(db, "notes"), where("userEmail", "==", userEmail));
      const querySnapshot = await getDocs(q);
      const notes = querySnapshot.docs.map((doc) => doc.data());
      setNotes(notes);
    } catch(error) {
      console.log(error);
    }
  }

  const onAddNote = async () => {
    try {
      const newNote = {
        id: uuid(), 
        title: 'New Note',
        content: '',
        modDate: Date.now(),
      };
      const user = auth.currentUser;
      if (user) {
        const newNoteWithUserData = {
          ...newNote,
          userEmail: user.email,
        }
        const docRef = await addDoc(collection(db, "notes"), newNoteWithUserData);
        setNotes([...notes, newNote]);
      } else {
        console.log("ログインされていません");
      }
    } catch(error) {
      console.log(error);
    }
  }

  const onDeleteNote = async (id) => {
    
    try {
      await deleteDoc(doc(db, "notes", id));
      const filterNotes = notes.filter((note) => note.id !== id);
      setNotes(filterNotes);
    } catch(error) {
      console.log("削除に失敗しました");
      console.log(error);
    }
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

  return (
    <div className="Home">
      <Navi 
        onAddNote={onAddNote} 
        notes={notes} 
        onDeleteNote={onDeleteNote} 
        activeNote={activeNote} 
        setActiveNote={setActiveNote}
      />
      <Main 
        activeNote={getActiveNote()}
      />
    </div>
  )
}

export default Home