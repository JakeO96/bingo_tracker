import { Outlet } from "react-router"
import { AuthProvider } from "./AuthContext"
import { MainHeader } from "./MainHeader"

function App() {
  
  return (
    <>
      <AuthProvider>
        <MainHeader />
        <div className="bg-[#F5F5F5]">
          <Outlet />
        </div>
      </AuthProvider>
    </>
  )
}

export default App
