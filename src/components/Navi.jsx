import React from 'react'
import './Navi.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useAuthContext } from '../auth/AuthContext';

const Navi = ({onAddNote, notes, onDeleteNote, activeNote, onActiveNote}) => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/login");
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="app-navi">
            <div className="app-navi-header">
                <h1>note</h1>
                <button onClick={handleLogout}>ログアウト</button>
                <button onClick={onAddNote}>+ Add Note</button>
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