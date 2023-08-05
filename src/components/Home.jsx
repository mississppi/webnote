import React, { useEffect, useState } from 'react'
import "./Home.css";
import Navi from './Navi'
import Main from './Main'
import uuid from 'react-uuid';
import Notification from './Notification';
import { auth, db } from '../api/firebase'
import {doc, addDoc, collection, deleteDoc, getDocs, query, where, updateDoc} from "firebase/firestore"
import { useAuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { addNewNote, deleteNote, fetchNotesByUid, updateNote } from '../api/api';

const Home = () => {
  const { user } = useAuthContext();
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem('isDarkMode')));
  const [isVisible, setIsVisible] = useState(false);
  const [viewToggle, setViewToggle] = useState(false);
  const [showState, setShowState] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      const fetchNotes = async () => {
        try{
          const notesArray = await fetchNotesByUid(user.uid);
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

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode));
  }

  const onAddNote = async () => {
    try {
      if(user.email == null){
        if(notes.length == 3){
          setShowState(true)
          setTimeout(() => {
            setShowState(false);
          }, 3000);
          return;
        }
      }
      const newNote = {
        id: uuid(), 
        title: 'New Note',
        content: 'content',
        modDate: Date.now(),
        uid: user.uid,
      };
      const docRef = addNewNote(newNote);
      setNotes([...notes, newNote]);
    } catch(error) {
      console.log(error);
    }
  }

  const onDeleteNote = async (id) => {
    try {
      const isDeleted = await deleteNote(id);
      if (isDeleted) {
        const filterNotes = notes.filter((note) => note.id !== id);
        if(filterNotes.length != 0){
          setActiveNote(filterNotes[0]);
        } else {
          setActiveNote(null);
        }
        setNotes(filterNotes);
      }
    } catch(error) {
      console.log(error);
    }
  }

  const onUpdateNote = async () => {
    try {
      const isUpdated = updateNote(
        activeNote.id,
        activeNote.title,
        activeNote.content,
      );
      if(isUpdated) {
        const notesArray = await fetchNotesByUid(user.uid);
        setNotes(notesArray);
      }
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

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    }).catch((error) => {
      console.log(error);
    });
  }

  if(!user) {
    navigate("/login");
  } else {
    return (
      <div className={`Home ${isDarkMode ? "darkmode" : ""}`}>
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
          logout={handleLogout}
          isDarkMode={isDarkMode}
          handleModeToggle={handleModeToggle}
        />
        {showState &&  <Notification message="3つまで!" isVisible={isVisible} setIsVisible={setIsVisible}/>}
      </div>
    )
  }
}

export default Home