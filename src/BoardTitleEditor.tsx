import React, { useEffect, useRef, useState } from "react"
import { PlainFormField } from "./FormFields"

type BoardTitleEditorProps =  {
  title: string;
  onSave: (nextTitle: string) => void;
}

export default function BoardTitleEditor({
  title,
  onSave,
}: BoardTitleEditorProps) {
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

  const handleFinishEditing = () => {
    const trimmedTitle = draftTitle.trim()
    onSave(trimmedTitle)
    setIsEditing(false)
  }

  const handleCancelEditing = () => {
    setDraftTitle(title)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleFinishEditing()
    }

    if (e.key === "Escape") {
      e.preventDefault()
      handleCancelEditing()
    }
  }

  if (isEditing) {
    return (
      <PlainFormField
        ref={inputRef}
        type={'text'}
        name={'board title'}
        placeholder="Untitled Board"
        styles="bg-transparent text-center text-2xl font-bold outline-none border-b border-gray-400 px-2"
        value={draftTitle}
        required={false}
        onChange={({ value }) => setDraftTitle(value)}
        onBlur={handleFinishEditing}
        onKeyDown={handleKeyDown}
      />
    )
  }

  return (
    <button 
      type="button"
      onClick={handleStartEditing}
      className="inline-flex items-center justify-center h-full bg-transparent border-none text-2xl font-bold px-2 
                hover:cursor-pointer hover:shadow-md hover:shadow-black hover:bg-slate-50"
    >
      {title.trim() || "Untitled Board"}
    </button>
  )

}