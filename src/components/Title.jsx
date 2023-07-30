import React, { useEffect, useState } from 'react'

const Title = ({isDarkMode, activeNote, childTitleRef, setIsTitleEdited}) => {
    const [localTitle, setLocalTitle] = useState("");
    useEffect(() => {
        if(activeNote) {
            setLocalTitle(activeNote.title);
            setIsTitleEdited(false);
            childTitleRef.current = '';
        } else {
            setLocalTitle('')
        }
    }, [activeNote])

    const handleChangeTitle = (e) => {
        setLocalTitle(e.target.value);
        setIsTitleEdited(true);
        childTitleRef.current = e.target.value;
    }

    return (
        <div>
            <input 
                id="title"
                className={`${isDarkMode ? "darkmode" : ""}`}
                type="text" 
                value={localTitle} 
                onChange={handleChangeTitle}
            /> 
        </div>
    )
}

export default Title