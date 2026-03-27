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
  const formInputStyles = "h-11 p-1 bg-white border border-gray-400 w-full focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-300"

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
      className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 p-4'
    > {/* container for editor form */}
      <div className='w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-md shadow-2xl shadow-black'> {/* editor form holder */}
        <form
          onSubmit={onFormSubmit}
          className="flex h-full max-h-[90vh] flex-col"  
        >
          <div className='flex-1 overflow-y-auto p-3 bg-[#f5f5f5]'>
            <div className='shadow-sm bg-[#e5e7eb]'>
              <div className="w-full p-4 pt-5">
                <h2 className="text-left text-gray-800 text-sm font-medium pb-0.5">Title</h2>
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
              <div className="grid grid-cols-[1fr_88px] gap-4 items-end px-4 pt-8">
                <div>
                  <h2 className="text-left text-gray-800 text-sm font-medium pb-0.5">Top Goal</h2>
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
                <div className='flex flex-col gap-0.5'>
                  <h3 className="ml-[3px] text-gray-600 text-sm font-medium">Points</h3>
                  <PlainFormField
                      type={'number'}
                      name={'goalPoints'} 
                      placeholder={''} 
                      styles={`input[type='number'] ${formInputStyles} text-center !w-12 rounded-md`}
                      value={String(fields.goals[0].points ?? '')}
                      onChange={({ value }) => updateGoals(0, "points", Number(value))}
                      required={false}
                  />
                </div>
              </div>
              <div className="grid grid-cols-[1fr_88px] gap-4 items-end px-4 pt-2">
                <div>
                  <h2 className="text-left text-gray-800 text-sm font-medium pb-0.5">Middle Goal</h2>
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
                <div className='flex flex-col gap-0.5'>
                  <h3 className="ml-[3px] text-gray-600 text-sm font-medium">Points</h3>
                  <PlainFormField
                      type={'number'} 
                      name={'goalPoints'} 
                      placeholder={''} 
                      styles={`input[type='number'] ${formInputStyles} text-center !w-12 rounded-md`}
                      value={String(fields.goals[1].points ?? '')}
                      onChange={({ value }) => updateGoals(1, "points", Number(value))}
                      required={false}
                  />
                </div>
              </div>
              <div className="grid grid-cols-[1fr_88px] gap-4 items-end px-4 pb-6 pt-2">
                <div>
                  <h2 className="text-left text-gray-800 text-sm font-medium pb-0.5">Bottom Goal</h2>
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
                <div className='flex flex-col gap-0.5'>
                  <h3 className="ml-[3px] text-gray-600 text-sm font-medium">Points</h3>
                  <PlainFormField
                      type={'number'} 
                      name={'goalPoints'} 
                      placeholder={''} 
                      styles={`input[type='number'] ${formInputStyles} text-center !w-12 rounded-md`}
                      value={String(fields.goals[2].points ?? '')}
                      onChange={({ value }) => updateGoals(2, "points", Number(value))}
                      required={false}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center w-full gap-3">
              <button
                type="button"
                onClick={onClose}
                className='inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border 
                border-gray-600 bg-white px-6 text-sm font-semibold text-black transition duration-200 hover:cursor-pointer 
                hover:bg-red-400 hover:text-white hover:border-red-400 
                focus:outline-none focus:ring-2 focus:ring-red-200 active:scale-[0.98]'
              >
                  Cancel
              </button>
              <button 
                type='submit' 
                className="w-1/3 inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-emerald-500 
                px-6 text-sm font-semibold text-white transition duration-200 hover:cursor-pointer 
                hover:brightness-120 focus:outline-none focus:ring-2 focus:ring-emerald-200 active:scale-[0.98]"
              >
                <p className="py-1 text-black-400">
                  Save Tile
                </p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}