import React, { useState } from 'react'
import Navi from './Navi'
import Main from './Main'
import uuid from 'react-uuid'
import { auth } from '../firebase'
import {doc, addDoc, collection, deleteDoc} from "firebase/firestore"
import {db} from "../firebase"
import "./Home.css";
const Home = () => {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);
  
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