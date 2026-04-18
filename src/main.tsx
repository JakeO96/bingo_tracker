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
import { expressApi } from './express-api/index.ts'
import SingleBoardPage from './SingleBoardPage.tsx'
import EditBoardPage from './EditBoardPage.tsx'
import CreateEventPage from './CreateEventPage.tsx'
import AllCreatedBoardsPage from './AllCreatedBoardsPage.tsx'
import AllCreatedEventsPage from './AllCreatedEventsPage.tsx'
import EventMainPage from './EventMainPage.tsx'
import EventTeamPage from './EventTeamPage.tsx'
import JoinEventPage from './JoinEventPage.tsx'

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
                    const boardSummaries = await expressApi.boards.getAllBoardSummariesForUser()
                    return {records: boardSummaries}   
                  },
          element: <AllCreatedBoardsPage />,
        },
        {
          path: "board/:id",
          loader: async ({ params }) => {
                    const boardId = params.id

                    if (!boardId) {
                      throw new Error("Board id is missing")
                    }

                    const board = await expressApi.boards.getBoard(boardId)
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

            const board = await expressApi.boards.getBoard(boardId)
            return { record: board }
          },
          element: <EditBoardPage />
        },
        {
          path: 'create-event',
          loader: async () => { 
                    const boardSummaries = await expressApi.boards.getAllBoardSummariesForUser()
                    console.log('in the loader to CreateEventPage, boardSummaries vvv')
                    console.log(boardSummaries)
                    return {records: boardSummaries}   
                  },
          element: <CreateEventPage />
        },
        {
          path: 'events-created',
          loader: async () => {
              const eventSummaries = await expressApi.events.getAllEventSummariesForUser()
              return {records: eventSummaries}  
          },
          element: <AllCreatedEventsPage />
        },
        {
          path: 'event/:id',
          loader: async ({ params }) => {
            const eventId = params.id

            if (!eventId) {
              throw new Error("Event id is missing")
            }

            const eventData = await expressApi.events.getEvent(eventId)
            return { eventData }
          },
          element: <EventMainPage />
        },
        {
          path: 'event/:eventId/team/:teamId',
          loader: async ({ params }) => {
            const eventId = params.eventId
            const teamId = params.teamId

            if(!eventId || !teamId) {
              throw new Error("Event id or team id is missing")
            }

            const teamPageEventData = await expressApi.events.getEventSingleTeamData({ eventId, teamId })

            return { teamPageEventData }
          },
          element: <EventTeamPage />
        },
        {
          path: 'join/:joinToken',
          loader: async ({ params }) => {
            const joinToken = params.joinToken

            if(!joinToken) {
              throw new Error("Join Token is missing")
            }

            const joinEventPageData = await expressApi.participantAuth.getJoinEventPageData(joinToken)

            return { joinEventPageData }
          },
          element: <JoinEventPage />
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
