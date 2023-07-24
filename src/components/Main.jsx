import React, { useState, useRef, useEffect } from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons'
import {useKey} from 'react-use';
import './Main.css'
import Header from './Header';
import Content from './Content';
import Title from './Title';

const Main = ({
  activeNote, 
  onInputChange, 
  onTextAreaChange, 
  onUpdateNote, 
  logout, 
  isDarkMode, 
  handleModeToggle, 
  }) => {

  const [isContentFocused, setIsContentFocused] = useState(false);
  const [isTitleEdited, setIsTitleEdited] = useState(false);
  const [isContentEdited,setIsContentEdited] = useState(false);
  const childContentRef = useRef('');
  const childTitleRef = useRef('');

  const handleSave = () => {
    event.preventDefault();
    if(isTitleEdited){
      activeNote.title = childTitleRef.current;
    }
    if(isContentEdited){
      activeNote.content = childContentRef.current;
    }
    if(activeNote){
      onUpdateNote();
    }
  }
  const saveKey = (event) => event.key === 's' && event.metaKey;
  useKey(saveKey, handleSave);

  //1行コピーをします
  const handleCopy = (event) => {
    if(isContentFocused) {
      event.preventDefault();

      //キャレット位置を取得
      const currentCaret = event.target.selectionStart;

      //キャレット位置からstartとend取得
      //編集中文字列も取得
      const text = event.target.value;
      const start = text.lastIndexOf('\n', currentCaret - 1) + 1;
      const end = text.indexOf('\n', currentCaret);
      const previous = text.charAt(currentCaret - 1);

      // 現在位置が末尾かつ1文字前が改行コードの場合、全コピーされてしまうためreturn
      // const previous = text.charAt(currentCaret - 1);
      if (currentCaret == text.length){
        if(previous == '\n'){
          return;
        }
      }
      //範囲選択
      event.target.setSelectionRange(start, end === -1 ? text.length : end);
      const selectedText = event.target.value.substring(start, end);

      navigator.clipboard.writeText(selectedText)
      .then(() => {
        //キャレットをもとに位置に戻す
        event.target.setSelectionRange(currentCaret, currentCaret);
        return;
      })
      .catch((error) => {
        console.log("copy error", error);
      })

    }
  }

  const copyKey = (event) => event.metaKey && event.key === 'c';
  useKey(copyKey, handleCopy);


  const handleContentFocus = () => {
    setIsContentFocused(true);
  }

  const handleContentBlur = () => {
    setIsContentFocused(false);
  }
  
  if(!activeNote){
    return <div className='no-active-note'>ノートを選んでね</div>
  }
  
  return (
    <div className="app-main">
      <Header 
        logout={logout}
        isDarkMode={isDarkMode}
        handleModeToggle={handleModeToggle}
      />
      <div className="app-main-note-edit">
        <Title 
          isDarkMode={isDarkMode}
          activeNote={activeNote}
          childTitleRef={childTitleRef}
          setIsTitleEdited={setIsTitleEdited}
        />
        <Content 
          isDarkMode={isDarkMode}
          activeNote={activeNote}
          childContentRef={childContentRef}
          setIsContentEdited={setIsContentEdited}
          handleContentFocus={handleContentFocus}
          handleContentBlur={handleContentBlur}
        />
        <div className='app-main-help'>
          <span className='save'>SAVE = ⌘ + s</span>
        </div>
      </div>
    </div>
  )
}

export default Main