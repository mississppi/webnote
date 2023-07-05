import React, { useEffect, useState } from 'react'
import "./Home.css";
import Navi from './Navi'
import Main from './Main'
import uuid from 'react-uuid'
import { auth, db } from '../firebase'
import {doc, addDoc, collection, deleteDoc, getDocs, query, where, updateDoc} from "firebase/firestore"
import { useAuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuthContext();
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      const fetchNotes = async () => {
        try{
          const notesArray = await fetchNotesByEmail(user.email);
          if(notesArray.length != 0){
            setActiveNote(notesArray[0]);
          }
          setNotes(notesArray);
        } catch(error) {
          console.log(error);
        }
      }
      fetchNotes();
    }
  },[user]);

  const fetchDocumentId = async (id) => {
    const q = query(collection(db, "notes"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const doc_id = querySnapshot.docs.map((doc) => {
      return doc.id;
    })
    return doc_id;
  }

  const fetchNotesByEmail = async (email) => {
    const q = query(collection(db, "notes"), where("userEmail", "==", email));
    const querySnapshot = await getDocs(q); 
    const notesArray = querySnapshot.docs.map((doc) => {
      return doc.data();
    })
    return notesArray;
  }

  const onAddNote = async () => {
    try {
      const newNote = {
        id: uuid(), 
        title: 'New Note',
        content: 'content',
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
      const doc_id = await fetchDocumentId(id);
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

  const onUpdateNote = async () => {
    try {
      const doc_id = await fetchDocumentId(activeNote.id);
      const documentRef = doc(db, 'notes', doc_id[0]);
      const updatedNote = { 
        title: activeNote.title,
        content: activeNote.content,
      };
      await updateDoc(documentRef, updatedNote);

      const notesArray = await fetchNotesByEmail(user.email);
      setNotes(notesArray);
      
    } catch(error) {
      console.log(error);
    }
  }

  const handleNoteActive = (note) => {
    setActiveNote(note);
  }

  const handleInputChange = (e) => {
    setActiveNote({
      ...activeNote, 
      title: e.target.value
    })
  }

  const handleTextAreaChange = (e) => {
    setActiveNote({
      ...activeNote, 
      content: e.target.value
    })
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
          onActiveNote={handleNoteActive}
        />
        <Main 
          activeNote={activeNote}
          onInputChange={handleInputChange}
          onTextAreaChange={handleTextAreaChange}
          onUpdateNote={onUpdateNote}
        />
      </div>
    )
  }
}

export default Home