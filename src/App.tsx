import { Outlet } from "react-router"
import { AuthProvider } from "./AuthContext"
import { MainHeader } from "./MainHeader"

function App() {
  
  return (
    <>
      <AuthProvider>
        <div className="flex flex-col h-screen overflow-hidden">
          <MainHeader />
          <div className="flex flex-1 min-h-0 bg-[#F5F5F5]">
            <main className="flex-1 mx-20 pt-6 pb-3 overflow-auto min-h-0">
              <Outlet />
            </main>
          </div>
        </div>
      </AuthProvider>
    </>
  )
}

export default App
