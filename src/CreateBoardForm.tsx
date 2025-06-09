import React, { useContext, useState } from "react";
import { PlainFormField } from './FormFields';
import { BingoBoard, type BoardTileData } from "./BingoBoard";
import { AuthContext } from "./AuthContext";
import ExpressAPI from "./express-api"

type InputObject = {
  name: string,
  value: string,
  error?: string,
}

type Field = {
  tileHeader: string;
  tileGoals: string;
}

export const CreateBoardForm: React.FC<object> = () => {

  const [fields, setFields] = useState<Field>({ tileHeader: '', tileGoals: '' })
  const [bingoBoard, setBingoBoard] = useState<Array<BoardTileData>>([])

  const { currentClientUsername } = useContext(AuthContext)
  const formInputStyles = 'p-1 bg-[#f5f5f5] inset-shadow-sm inset-shadow-gray-500 w-full focus:outline-1 focus:ring-0 focus:border-transparent'
  const expressApi = new ExpressAPI()

  const onInputChange = ({ name, value }: InputObject): void => {
    setFields(prev => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    const goalList = fields.tileGoals.split(',').map(goal => goal.trim())
    setBingoBoard([...bingoBoard, {'tileHeader': fields.tileHeader, 'tileGoals': goalList}])
    setFields({ tileHeader: '', tileGoals: '' })
  };

  const onBoardFinish = async (evt: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    evt.preventDefault()
    console.log(`username: ${currentClientUsername}`)
    expressApi.createBoard({ owner: currentClientUsername, board: bingoBoard })
  }

  return (  
    <div className="grid grid-cols-2 w-screen h-screen">
      <div>
        <div className="flex justify-center mb-6 p-4">
          <h1 className="font-bold text-3xl">
            Add Your Bingo Tiles
          </h1>
        </div>
        <div className="flex justify-center">
          <form 
            onSubmit={onFormSubmit} 
            className="flex flex-col items-center"
          >
            <div className="w-full bg-[#c8c8c8] p-6 shadow-md">
              <h2 className="text-left mb-1 mt-2">Title</h2>
              <PlainFormField
                  type={'text'} 
                  name={'tileHeader'} 
                  placeholder={'Add Title'} 
                  styles={`input[type='text'] ${formInputStyles}`}
                  onChange={onInputChange}
                  value={fields.tileHeader}
                  required={false}
              />
              <h2 className="text-left mb-1 mt-2">Tile Goals <i className="text-sm">3 comma separated</i></h2>
              <PlainFormField
                  type={'text'} 
                  name={'tileGoals'} 
                  placeholder={'Add list of goals'} 
                  styles={`input[type='text'] ${formInputStyles}`}
                  onChange={onInputChange}
                  value={fields.tileGoals}
                  required={false}
              />
              <div className="flex justify-center">
                <button type='submit' className="whitespace-nowrap inline-flex items-center justify-center font-semibold ease-in duration-200 rounded-full outline outline-black-400 text-black-400 bg-[#f5f5f5] w-6/12 my-3 hover:bg-green-400 hover:text-white hover:outline-none cursor-pointer">
                  <p className="py-2">
                    Add Tile
                  </p>
                </button>
              </div>
              <div className="my-2 h-px w-full bg-gradient-to-r from-transparent via-[#0a0a0a] to-transparent" />
              <div className="flex justify-center">
                <button onClick={onBoardFinish} className="w-full whitespace-nowrap inline-flex items-center justify-center font-semibold ease-in duration-200 rounded-full outline outline-black-400 text-black-400 bg-[#f5f5f5] w-6/12 my-3 hover:bg-green-400 hover:text-white hover:outline-none cursor-pointer">
                  <p className="py-2">
                    Finish Board
                  </p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="overflow-auto bg-[#f2f2f2] inset-shadow-sm inset-shadow-black-500 p-4">
        <div className="flex justify-center mb-6">
          <h1 className="font-bold text-3xl">
            Board Preview
          </h1>
        </div>
        < BingoBoard allBoardTiles={bingoBoard}/>
      </div>
    </div>
  )
}
