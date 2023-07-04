import React, { useState } from 'react'
import {useKey} from 'react-use';
import './Main.css'

const Main = ({activeNote, onInputChange, onTextAreaChange, onUpdateNote}) => {

  if(!activeNote){
    return <div className='no-active-note'>ノートを選んでね</div>
  }
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input 
          id="title"
          type="text" 
          value={activeNote?.title || ""}
          onChange={onInputChange}
        />
        <textarea 
          id="content"
          value={activeNote?.content || ""}
          onChange={onTextAreaChange}
        />
        <button onClick={onUpdateNote}>Save</button>
      </div>
    </div>
  )
}

export default Main