import { Outlet } from "react-router"
import { AuthProvider } from "./AuthContext"
import { MainHeader } from "./MainHeader"
import { SideNav } from "./SideNav"

function App() {
  
  return (
    <>
      <AuthProvider>
        <div className="flex flex-col h-screen overflow-hidden">
          <MainHeader />
          <div className="flex flex-1 min-h-0">
            <SideNav />
            <main className="flex-1 p-6 bg-[#F5F5F5] overflow-auto min-h-0">
              <Outlet />
            </main>
          </div>
        </div>
      </AuthProvider>
    </>
  )
}

export default App
