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
import SingleBoardPage from './SingleBoardPage.tsx'
import EditBoardPage from './EditBoardPage.tsx'
import CreateEventPage from './CreateEventPage.tsx'

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
        },
        { path: "create-board", 
          element: <CreateBoardPage /> 
        },
        {
          path: "boards-created", 
          loader: async () => { 
                    const records = await expressApi.getAllBoardsForUser()
                      .then(boards => {
                        return { records: boards}
                      })
                    return {records: records}   
                  },
          element: <CreatedBoards />,
        },
        {
          path: "board/:id",
          loader: async ({ params }) => {
                    const boardId = params.id

                    if (!boardId) {
                      throw new Error("Board id is missing")
                    }

                    const board = await expressApi.getBoard(boardId)
                    return { record: board}
                  },
          element: <SingleBoardPage />
        },
        {
          path: 'board/:id/edit',
          loader: async({ params }) => {
            const boardId = params.id
            if (!boardId) {
              throw new Error("Board id is missing")
            }

            const board = await expressApi.getBoard(boardId)
            return { record: board }
          },
          element: <EditBoardPage />
        },
        {
          path: 'create-event',
          loader: async () => { 
                    const boardSummaries = await expressApi.getAllBoardSummariesForUser()
                    console.log('in the loader to CreateEventPage, boardSummaries vvv')
                    console.log(boardSummaries)
                    return {records: boardSummaries}   
                  },
          element: <CreateEventPage />
        }
      ]
    }
  ]
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
