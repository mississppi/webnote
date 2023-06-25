import React from 'react'
import './Main.css'

const Main = ({activeNote}) => {
  
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input 
          id="title"
          type="text" 
          // value={activeNote.title}
        />
        <textarea 
          id="content"
          // value={activeNote.content}
        />
      </div>
    </div>
  )
}

export default Main