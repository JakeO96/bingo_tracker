import { Link } from "react-router"

export const DashBoard: React.FC<object> = () => {

  return ( 
    <>
      <button>
        <Link to="create-board">Create New Board</Link>
      </button>
    </>
  )
}