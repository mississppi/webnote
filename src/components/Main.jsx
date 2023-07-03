import React, { useState } from 'react'
import {useKey} from 'react-use';
import './Main.css'
import { doc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Main = ({activeNote, setActivenNote}) => {
  const [isTitleChanged, setIsTitleChanged] = useState(false);
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
    setIsTitleChanged(true);
  }

  const handleContentChange = (event) => {
    setEditedContent(event.target.value);
    setIsContentChanged(true);
  }

  const handleUpdate = async () => {
    try {
      const q = query(collection(db, "notes"), where("id", "==", activeNote.id));
      const querySnapshot = await getDocs(q);
      const doc_id = querySnapshot.docs.map((doc) => {
        return doc.id;
      });
      const documentRef = doc(db, 'notes', doc_id[0]);
      const updatedNote = { 
        title: isTitleChanged ? editedTitle : activeNote.title,
        content: isContentChanged ? editedContent : activeNote.content,
      };
      await updateDoc(documentRef, updatedNote);
      console.log("更新が完了しました");

    } catch(error) {
      console.log(error);
    }
  }

  if(!activeNote){
    return <div className='no-active-note'>ノートを選んでね</div>
  }
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input 
          id="title"
          type="text" 
          // value={editedTitle ?? activeNote.title}
          defaultValue={activeNote.title}
          onChange={handleTitleChange}
        />
        <textarea 
          id="content"
          // value={activeNote.content}
          defaultValue={activeNote.content}
          onChange={handleContentChange}
        />
        <button onClick={handleUpdate}>Save</button>
      </div>
    </div>
  )
}

export default Main