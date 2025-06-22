//import type { Route } from './+types/product'
import { Outlet } from "react-router"
//import type { BingoBoard } from "./bingo/types"

export const DashBoard: React.FC<object> = () => {

  /*
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
      */

  return ( 
    <>
      <Outlet />
    </>

  )
}