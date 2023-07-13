import React from 'react'
import './Navi.css';

const Navi = ({onAddNote, notes, onDeleteNote, activeNote, onActiveNote}) => {
    return (
        <div className="app-navi">
            <div className="app-navi-header">
                <h1>note</h1>
                <button  onClick={onAddNote}>
                    ADD = command + n
                </button>
                <span className="save">
                    ADD = ⌘ + n
                </span>
            </div>
            <div className="app-navi-notes">
                {notes.map((note) => (
                    <div 
                        className={`app-navi-note ${note.id === activeNote && "active"}`}
                        key={note.id}
                        onClick={() => onActiveNote(note)}
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