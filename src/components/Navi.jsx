import React from 'react'
import './Navi.css';

const Navi = ({onAddNote, notes, onDeleteNote, activeNote, setActiveNote}) => {

    return (
        <div className="app-navi">
            <div className="app-navi-header">
                <h1>ノート</h1>
                <button onClick={onAddNote}>追加</button>
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
                            <button onClick={() => onDeleteNote(note.id)}>削除</button>
                        </div>
                        <p>{note.content}</p>
                        <small>{note.modDate}</small>
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default Navi