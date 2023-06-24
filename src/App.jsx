import { useState } from 'react'
import './App.css'
import Navi from './components/Navi'
import Main from './components/Main'
import uuid from 'react-uuid'

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);
  
  const onAddNote = () => {
    const newNote = {
      id: uuid(), 
      title: 'New Note',
      content: '',
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
  }

  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

  return (
    <div className='App'>
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

export default App
