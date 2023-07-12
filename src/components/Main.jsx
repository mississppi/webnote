import React, { useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons'
import {useKey} from 'react-use';
import './Main.css'

const Main = ({activeNote, onInputChange, onTextAreaChange, onUpdateNote, logout, isDarkMode, handleModeToggle}) => {

  const handleSave = () => {
    event.preventDefault();
    if(activeNote){
      onUpdateNote();
    }
  }
  const saveKey = (event) => event.key === 's' && event.metaKey;
  useKey(saveKey, handleSave);

  if(!activeNote){
    return <div className='no-active-note'>ノートを選んでね</div>
  }
  return (
    <div className="app-main">
      <div className="app-main-header">
        <span className="icon" onClick={handleModeToggle}>
          { isDarkMode ? (
              <FontAwesomeIcon icon={faMoon} size="xl"/>
            ) : (
              <FontAwesomeIcon icon={faSun} size="xl"/>
            )
          }
        </span>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="app-main-note-edit">
        <input 
          id="title"
          className={`${isDarkMode ? "darkmode" : ""}`}
          type="text" 
          value={activeNote?.title || ""}
          onChange={onInputChange}
        />
        <textarea 
          id="content"
          className={`${isDarkMode ? "darkmode" : ""}`}
          value={activeNote?.content || ""}
          onChange={onTextAreaChange}
        />
        <div className='app-main-help'>
          <span className='save'>SAVE = ⌘ + s</span>
        </div>

        {/* <button onClick={onUpdateNote}>Save</button> */}
      </div>
    </div>
  )
}

export default Main