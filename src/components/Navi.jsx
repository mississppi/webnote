import React from 'react'
import './Navi.css';

const Navi = ({onAddNote, notes, onDeleteNote, activeNote, setActiveNote}) => {

    return (
        <div className="app-navi">
            <div className="app-navi-header">
                <h1>のーと</h1>
                <button onClick={onAddNote}>+ Add Note</button>
            </div>
            <div className="app-navi-notes">
                {notes.map((note) => (
                    <div 
                        className={`app-navi-note ${note.id === activeNote && "active"}`}
                        key={note.id}
                        onClick={() => setActiveNote(note.id)}
                    >
                        <div className="navi-note-title">
                            <strong>{note.title}</strong>
                            <button onClick={() => onDeleteNote(note.id)}>Delete</button>
                        </div>
                        <p>{note.content}</p>
                        <small>{ new Date(note.modDate).toLocaleDateString("ja-JP", {
                            hour: "2-digit",
                            minute: "2-digit",
                        }) }</small>
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default Navi