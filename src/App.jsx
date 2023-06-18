import { useState } from 'react'
import './App.css'
import Navi from './components/Navi'
import Main from './components/Main'
import uuid from 'react-uuid'

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);
  
  const onAddNote = () => {
    console.log("add");
    const newNote = {
      id: uuid(), 
      title: 'new',
      content: 'content',
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
    console.log(newNote);
  }

  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  }

  return (
    <div className='App'>
      <Navi onAddNote={onAddNote} notes={notes} onDeleteNote={onDeleteNote} activeNote={activeNote} setActiveNote={setActiveNote}/>
      <Main />
    </div>
  )
}

export default App
