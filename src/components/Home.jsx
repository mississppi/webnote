import React, { useEffect, useState } from 'react'
import "./Home.css";
import Navi from './Navi'
import Main from './Main'
import uuid from 'react-uuid'
import { auth, db } from '../firebase'
import {doc, addDoc, collection, deleteDoc, getDocs, query, where} from "firebase/firestore"
import { useAuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuthContext();
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      const fetchNotes = async () => {
        try{
          const q = query(collection(db, "notes"), where("userEmail", "==", user.email));
          const querySnapshot = await getDocs(q); 
          const notesArray = querySnapshot.docs.map((doc) => {
            return doc.data();
          })
          setNotes(notesArray);
        } catch(error) {
          console.log(error);
        }
      }
      fetchNotes();
    }
  },[user]);

  const onAddNote = async () => {
    try {
      const newNote = {
        id: uuid(), 
        title: 'New Note',
        content: '',
        modDate: Date.now(),
        userEmail: user.email,
      };
      const docRef = await addDoc(collection(db, "notes"), newNote);
      setNotes([...notes, newNote]);
    } catch(error) {
      console.log(error);
    }
  }

  const onDeleteNote = async (id) => {
    try {
      const q = query(collection(db, "notes"), where("id", "==", id));
      const querySnapshot = await getDocs(q);
      const doc_id = querySnapshot.docs.map((doc) => {
        return doc.id;
      })
      await deleteDoc(doc(db, 'notes', doc_id[0])).
      then(() => {  
        console.log("deleted");
      }).
      catch((error) => {
        console.log(error);
      });
      const filterNotes = notes.filter((note) => note.id !== id);
      setNotes(filterNotes);
    } catch(error) {
      console.log(error);
    }
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

  if(!user) {
    navigate("/login");
  } else {
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
}

export default Home