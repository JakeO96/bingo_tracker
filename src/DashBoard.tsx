//import type { Route } from './+types/product'
import { useContext, useState } from "react"
import { Link } from "react-router"
import { AuthContext } from "./AuthContext"
import expressApi from "./express-api"
import type { BingoBoard } from "./bingo/types"
//import type { BingoBoard } from "./bingo/types"

export const DashBoard: React.FC<object> = () => {

  const currentUser = useContext(AuthContext)
  const [allUserOwnedBoards, setAllUserOwnedBoards] = useState<BingoBoard>([])

  const onUserOwnedBoardsClick  = async (evt: React.MouseEvent<HTMLButtonElement>): Promise<void>=> {
    evt.preventDefault()
    console.log(`usernameLogged: ${JSON.stringify(currentUser.currentClientUsername)}`)
    expressApi.getAllBoardsForUser()
      .then(response => response.json())
      .then(boards => {
        console.log(boards)
        setAllUserOwnedBoards(boards)
      })
  }

  return ( 
    <div className="flex flex-col items-center h-screen">
      <button>
        <Link to="create-board">Create New Board</Link>
      </button>
      <button onClick={onUserOwnedBoardsClick} className={allUserOwnedBoards ? "cursor-pointer" : "cursor-pointer"}>
        See all your created boards
      </button>
      <Link to="/login"> Login </Link>
    </div>
  )
}