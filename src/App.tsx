import { Outlet } from "react-router"
import { AuthProvider } from "./AuthContext"

function App() {
  
  return (
    <>
      <AuthProvider>
        <div className="bg-[#F5F5F5]">
          <Outlet />
        </div>
      </AuthProvider>
    </>
  )
}

export default App
