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
  const childContentRef = useRef('');
  const childTitleRef = useRef('');

  const handleSave = () => {
    event.preventDefault();
    if(activeNote){
      onUpdateNote();
    }
  }
  const saveKey = (event) => event.key === 's' && event.metaKey;
  useKey(saveKey, handleSave);


  const handleCopy = (event) => {
    if(isContentFocused) {

      // これでコピーは止められる
      event.preventDefault();

      //cmd + c をしたキャレット位置を取得
      const currentCaret = event.target.selectionStart;

      //jsでstartとend取得
      //文字列
      const text = event.target.value;
      const start = text.lastIndexOf('\n', currentCaret - 1) + 1;
      const end = text.indexOf('\n', currentCaret);
      const previous = text.charAt(currentCaret - 1);

      //一致してかつ前の文字が改行コードじゃなければ
      // const previous = text.charAt(currentCaret - 1);
      if (currentCaret == text.length){
        if(previous == '\n'){
          console.log('こんなことしてちゃだめだ！');
          return;
        }
      }

      event.target.setSelectionRange(start, end === -1 ? text.length : end);
      const selectedText = event.target.value.substring(start, end);
      //copy
      navigator.clipboard.writeText(selectedText)
      .then(() => {
        console.log("copieeeddd");
        event.target.setSelectionRange(currentCaret, currentCaret);
        return;
      })
      .catch((error) => {
        console.log("osietetet");
      })

    }
    // console.log("copyyy");
    // console.log(isContentFocused);
  }

  const copyKey = (event) => event.metaKey && event.key === 'c';
  useKey(copyKey, handleCopy);


  const handleContentFocus = () => {
    setIsContentFocused(true);
  }

  const handleContentBlur = () => {
    setIsContentFocused(false);
  }

  //localstateの取得
  const handlegetStateButton = () => {

    //refローカルから取得
    if(childContentRef.current) {
      activeNote.content = childContentRef.current;
    }

    if(childTitleRef.current) {
      activeNote.title = childTitleRef.current;
    }

    //保存しないまま別のnoteを選択するとrefが解放されていない

    //updateする
    if(activeNote){
      onUpdateNote();
    }
    console.log("updated!!!");

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
        />
        <Content 
          isDarkMode={isDarkMode}
          activeNote={activeNote}
          childContentRef={childContentRef}
        />
        <div className='app-main-help'>
          <span className='save'>SAVE = ⌘ + s</span>
        </div>

        <button onClick={handlegetStateButton}>
          保存
        </button>
      </div>
    </div>
  )
}

export default Main