import { useState } from 'react'
import type { GoalData, TileData } from '../shared/types/bingo'
import { PlainFormField } from './FormFields';

type TileEditorModalProps =  {
  tile: TileData;
  onClose: () => void;
  onSave: (tile: TileData) => void;
}

type Fields = {
  title: string
  goals: GoalData[]
}

type InputObject = {
  name: string,
  value: string,
  error?: string,
}

export default function TileEditorModal({
  tile,
  onClose,
  onSave
}: TileEditorModalProps) {
  const [fields, setFields] = useState<Fields>({title: tile.title, goals: tile.goals})
  const formInputStyles = "p-1 bg-[#f5f5f5] inset-shadow-sm inset-shadow-gray-500 w-full focus:outline-1 focus:ring-0 focus:border-transparent"

  const onInputChange = ({ name, value }: InputObject): void => {
    setFields(prev => ({ ...prev, [name]: value }));
  }

  const updateGoals = (
    index: number,
    key: "text" | "points",
    value: string | number
  ) => {
    setFields(prev => ({
      ...prev,
      goals: prev.goals.map((goal, i) => 
        i === index ? { ...goal, [key]: value } : goal
      )
    }))
  }

  const onFormSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault()
    const updatedTile: TileData = {
      id: tile.id,
      title: fields.title,
      goals: fields.goals
    }
    onSave(updatedTile)
  }

  return (
    <div 
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4'
    > {/* container for editor form */}
      <div className='w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-md bg[#d9d9d9] shadow-xl'> {/* editor form holder */}
        <form
          onSubmit={onFormSubmit}
          className="flex h-full max-h-[90vh] flex-col bg-[#c8c8c8]"  
        >
          <div className='flex-1 overflow-y-auto p-3'>
            <div className="w-full bg-[#c8c8c8] p-2 shadow-md">
              <h2 className="text-left">Title</h2>
              <PlainFormField
                  type={'text'} 
                  name={'title'} 
                  placeholder={'Add Title'} 
                  styles={`input[type='text'] ${formInputStyles}`}
                  value={fields.title}
                  onChange={onInputChange}
                  required={false}
              />
            </div>
            <div className="grid grid-cols-[3fr_1fr] gap-3 items-end bg-[#c8c8c8] shadow-md pt-4 pb-2">
              <div className='pl-2'>
                <h2 className="text-left">Top Goal</h2>
                <PlainFormField
                    type={'text'} 
                    name={'goalText'} 
                    placeholder={'Add Goal'} 
                    styles={`input[type='text'] ${formInputStyles}`}
                    value={fields.goals[0].text}
                    onChange={({ value }) => updateGoals(0, "text", value)}
                    required={false}
                />
              </div>
              <div>
                <h3 className="text-left">Points</h3>
                <PlainFormField
                    type={'number'}
                    name={'goalPoints'} 
                    placeholder={''} 
                    styles={`input[type='number'] ${formInputStyles} text-center max-w-[45px] rounded-md bg-gray-100`}
                    value={String(fields.goals[0].points ?? '')}
                    onChange={({ value }) => updateGoals(0, "points", Number(value))}
                    required={false}
                />
              </div>
            </div>
            <div className="grid grid-cols-[3fr_1fr] gap-3 items-end bg-[#c8c8c8] shadow-md py-2">
              <div className='pl-2'>
                <h2 className="text-left">Middle Goal</h2>
                <PlainFormField
                    type={'text'} 
                    name={'goaltext'} 
                    placeholder={'Add Goal'} 
                    styles={`input[type='text'] ${formInputStyles}`}
                    value={fields.goals[1].text}
                    onChange={({ value }) => updateGoals(1, "text", value)}
                    required={false}
                />
              </div>
              <div>
                <h3 className="text-left grow-0">Points</h3>
                <PlainFormField
                    type={'number'} 
                    name={'goalPoints'} 
                    placeholder={''} 
                    styles={`input[type='number'] ${formInputStyles} text-center max-w-[45px] rounded-md bg-gray-100`}
                    value={String(fields.goals[1].points ?? '')}
                    onChange={({ value }) => updateGoals(1, "points", Number(value))}
                    required={false}
                />
              </div>
            </div>
            <div className="grid grid-cols-[3fr_1fr] gap-3 items-end bg-[#c8c8c8] shadow-md pb-4 pt-2">
              <div className='pl-2'>
                <h2 className="text-left">Bottom Goal</h2>
                <PlainFormField
                    type={'text'} 
                    name={'goaltext'} 
                    placeholder={'Add Goal'} 
                    styles={`input[type='text'] ${formInputStyles}`}
                    value={fields.goals[2].text}
                    onChange={({ value }) => updateGoals(2, "text", value)}
                    required={false}
                />
              </div>
              <div>
                <h3 className="text-left">Points</h3>
                <PlainFormField
                    type={'number'} 
                    name={'goalPoints'} 
                    placeholder={''} 
                    styles={`input[type='number'] ${formInputStyles} text-center max-w-[45px] rounded-md bg-gray-100`}
                    value={String(fields.goals[2].points ?? '')}
                    onChange={({ value }) => updateGoals(2, "points", Number(value))}
                    required={false}
                />
              </div>
            </div>
            <div className='grid grid-cols-[1fr_2fr] gap-3 items-end pt-3'>
              <div>
              <button
                type="button"
                onClick={onClose}
                className='whitespace-nowrap items-center justify-center font-semibold ease-in 
                duration-200 rounded-full outline outline-black-400 text-red-400 bg-[#f5f5f5] w-6/12 
                my-3 hover:bg-red-400 hover:text-white hover:outline-none cursor-pointer'
              >
                <p className="py-2">
                  Cancel
                </p>
              </button>
              </div>
              <div>
              <button 
                type='submit' 
                className="whitespace-nowrap items-center justify-center font-semibold ease-in 
                duration-200 rounded-full outline outline-green-400 bg-[#f5f5f5] w-6/12 
                my-3 hover:bg-green-400 hover:text-white hover:outline-none cursor-pointer"
              >
                <p className="py-2 text-black-400">
                  Save
                </p>
              </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}