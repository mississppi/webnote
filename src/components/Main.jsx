import React, { useState, useRef} from 'react'
import {useKey} from 'react-use';
import './Main.css'
import Header from './Header';
import Content from './Content';
import Title from './Title';

const Main = ({
  activeNote, 
  onUpdateNote, 
  logout, 
  isDarkMode, 
  handleModeToggle, 
  }) => {

  //タイトルとコンテンツの変更を管理するState
  const [isTitleEdited, setIsTitleEdited] = useState(false);
  const [isContentEdited,setIsContentEdited] = useState(false);

  // 子コンポーネントへの参照を作成
  const childContentRef = useRef('');
  const childTitleRef = useRef('');

  //キーボードショートカットで保存する関数を定義
  const handleSave = () => {
    event.preventDefault();

    //タイトルが変更されている場合は、activeNoteのtitleを更新
    if(isTitleEdited){
      activeNote.title = childTitleRef.current;
    }

    ///コンテンツが変更されている場合は、activeNoteのcontentを更新
    if(isContentEdited){
      activeNote.content = childContentRef.current;
    }

    //ノートが選択されている場合は更新を実行
    if(activeNote){
      onUpdateNote();
    }
  }

  // ⌘ + s キーで保存するためのハンドラ設定
  const saveKey = (event) => event.key === 's' && event.metaKey;
  useKey(saveKey, handleSave);

  // actiteNoteが無い場合は、選択するようメッセージ表示
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
        />
        <div className='app-main-help'>
          <span className='save'>SAVE = ⌘ + s</span>
        </div>
      </div>
    </div>
  )
}

export default Main