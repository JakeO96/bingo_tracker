import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.tsx'
import HomePage from './HomePage.tsx'
import CreateBoardPage from './CreateBoardPage.tsx'
import { LogInPage } from './LogInPage.tsx'
import { RegisterPage } from './RegisterPage.tsx'
import { DashBoard } from './DashBoard.tsx'
import expressApi from './express-api.ts'
import { CreatedBoards } from './CreatedBoards.tsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "login", element: <LogInPage /> },
        { 
          path: "dashboard", 
          element: <DashBoard />,
          children: [
            { path: "create-board", element: <CreateBoardPage /> },
            {
              path: "boards-created", 
              loader: async () => { 
                        const records = await expressApi.getAllBoardsForUser()
                          .then(response => response.json())
                          .then(boards => {
                            return { records: boards}
                          })
                        return {records: records}   
                      },
              element: <CreatedBoards />,
            }
          ]
        },
      ]
    }
  ]
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
