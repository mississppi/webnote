import React, { useEffect, useRef, useState } from 'react'
import { useKey } from 'react-use';

const Content = ({isDarkMode,activeNote,childContentRef,setIsContentEdited}) => {
  const [localContent, setLocalContent] = useState("");
  const [isContentFocused, setIsContentFocused] = useState(false);
  const textAreaRef = useRef(null);

  //1行コピーをします
  const handleCopy = (event) => {
    if(isContentFocused) {
        if(textAreaRef.current) {
          event.preventDefault();
          const textArea = textAreaRef.current;
          const currentCaret = textArea.selectionStart;
          const start = localContent.lastIndexOf('\n', currentCaret - 1) + 1;
          const end = localContent.indexOf('\n', currentCaret);
          if (currentCaret === localContent.length) {
            const previous = localContent.charAt(currentCaret - 1);
            if (previous === '\n') {
              return;
            }
          }
          const selectedText = localContent.substring(start, end === -1 ? localContent.length : end);
          copyToClipboard(selectedText);
        }
      }
    }
    const copyKey = (event) => event.metaKey && event.key === 'c';
    useKey(copyKey, handleCopy);

    //クリップボードにテキストをコピーする関数
    const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch (error) {
        console.log("error", error);
      }
    }
    
    useEffect(() => {
      //activeNoteが変更されたとき
      if(activeNote) {
        setLocalContent(activeNote.content);
        setIsContentEdited(false);
        childContentRef.current = '';
      } else {
        setLocalContent('')
      }
    }, [activeNote])

    //テキストエリアの内容が変更されたときの処理
    const handleChangeContent = (e) => {
      setLocalContent(e.target.value);
      setIsContentEdited(true);
      childContentRef.current = e.target.value;
    }

    //テキストエリアがフォーカスされたとき
    const handleContentFocus = () => {
      setIsContentFocused(true);
    }
  
    //テキストエリアがフォーカスを失ったとき
    const handleContentBlur = () => {
      setIsContentFocused(false);
    }

    return (
      <div>
          <textarea 
            id="content"
            ref={textAreaRef}
            className={`${isDarkMode ? "darkmode" : ""}`}
            value={localContent}
            onChange={handleChangeContent}
            onFocus={handleContentFocus} 
            onBlur={handleContentBlur}
          />
      </div>
    )
}

export default Content