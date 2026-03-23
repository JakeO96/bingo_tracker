import React, { useEffect, useRef, useState } from "react"
import { PlainFormField } from "./FormFields"

type BoardTitleEditorProps =  {
  title: string;
  onSave: (nextTitle: string) => void;
}

export default function BoardTitleEditor({
  title,
  onSave
}): BoardTitleEditorProps {
  const [isEditing, setIsEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(title)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!isEditing) {
      setDraftTitle(title)
    }
  } ,[title, isEditing])

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  const handleStartEditing = () => {
    setDraftTitle(title)
    setIsEditing(true)
  }

  const handleSave = () => {
    const trimmed = draftTitle.trim()
    onSave(trimmed)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setDraftTitle(title)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave()
    }

    if (e.key === "Escape") {
      handleCancel()
    }
  }

  if (isEditing){
    return (
      <PlainFormField
        ref={inputRef}
        type={'text'}
        value={draftTitle}
        onChange={(e) => setDraftTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add Board Title"
        
      />
    )
  }

}