import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import App from './App.tsx'
import HomePage from './HomePage.tsx'
import CreateBoardPage from './CreateBoardPage.tsx'
import { LogInPage } from './LogInPage.tsx'
import { RegisterPage } from './RegisterPage.tsx'
import { DashBoard } from './DashBoard.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}> {/*wraps all the routes below it in a standard layout, top-level layout*/}
          <Route index element={<HomePage />} /> {/* index makes it so the "/" root path directs to the Home element*/}
          <Route path="dashboard/create-board" element={<CreateBoardPage />} />
          <Route path ="register" element={<RegisterPage />} />
          <Route path="login" element={<LogInPage />} />
          <Route path="dashboard" element={<DashBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
