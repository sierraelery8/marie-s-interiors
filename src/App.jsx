import { Routes, Route, useLocation } from 'react-router-dom'

import Header from './components/Header'
import Sidebar from './components/Sidebar'

import Home from './pages/Home'
import Inspiration from './pages/Inspiration'
import RoomDesigner from './pages/RoomDesigner'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import NotFound from './pages/NotFound'

function App() {
  const location = useLocation()
  const isSidebarPage = [
    '/projects',
    '/room-designer',
  ].includes(location.pathname)

  return (
    <>
      {isSidebarPage ? (
        <div className="interior-layout">
          <Sidebar />

          <div className="interior-content">
            <Routes>
              <Route path="/projects" element={<Projects />} />
              <Route path="/room-designer" element={<RoomDesigner />} />
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </>
  )
}

export default App
