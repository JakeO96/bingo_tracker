//import type { Route } from './+types/product'
import { useContext } from "react"
import { Link } from "react-router"
import { AuthContext } from "./AuthContext"
import expressApi from "./express-api"
//import type { BingoBoard } from "./bingo/types"

export const DashBoard: React.FC<object> = () => {

  const currentUser = useContext(AuthContext)
  //const [allUserOwnedBoards, setAllUserOwnedBoards] = useState<BingoBoard>([])
  const onUserOwnedBoardsClick  = async (evt: React.MouseEvent<HTMLButtonElement>): Promise<void>=> {
    evt.preventDefault()
    console.log(`usernameLogged: ${JSON.stringify(currentUser.currentClientUsername)}`)
    const reqData = {username: currentUser.currentClientUsername}
    expressApi.getAllBoardsForUser(reqData).then((response) => {
        console.log(response.json()) 
    })

  }

  return ( 
    <div className="flex flex-col items-center h-screen">
      <button>
        <Link to="create-board">Create New Board</Link>
      </button>
      <button onClick={onUserOwnedBoardsClick} className="cursor-pointer">
        See all your created boards
        {/*all of the user's owned board area*/}
      </button>
      <Link to="/login"> Login </Link>
    </div>
  )
}