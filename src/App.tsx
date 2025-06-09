import { Outlet } from "react-router"
import { AuthProvider } from "./AuthContext"
import ExpressAPI from "./express-api";

function App() {

  const expressApi: ExpressAPI = new ExpressAPI();
  
  return (
    <>
      <AuthProvider expressApi= { expressApi }>
        <div className="bg-[#F5F5F5]">
          <Outlet />
        </div>
      </AuthProvider>
    </>
  )
}

export default App
