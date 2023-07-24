import React, { useEffect, useState } from 'react'

const Content = ({isDarkMode,activeNote,childContentRef,setIsContentEdited,handleContentFocus,handleContentBlur}) => {
    const [localContent, setLocalContent] = useState("");
    useEffect(() => {
      if(activeNote) {
        setLocalContent(activeNote.content);
        setIsContentEdited(false);
        childContentRef.current = '';
      } else {
        setLocalContent('')
      }
    }, [activeNote])

    const handleChangeContent = (e) => {
      setLocalContent(e.target.value);
      setIsContentEdited(true);
      childContentRef.current = e.target.value;
    }
    return (
      <div>
          <textarea 
            id="content"
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