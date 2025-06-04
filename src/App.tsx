import { Outlet } from "react-router"


function App() {
  return (
    <>
      <div className="bg-[#F5F5F5]">
        <Outlet />
      </div>
    </>
  )
}

export default App
