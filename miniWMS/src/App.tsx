import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import { TooltipProvider } from './components/ui/tooltip'
import HomeLayout from './layouts/home/HomeLayout'
import Contact from './pages/Contact'
import { DashBoard } from './pages/app/DashBoard'
import AppLayout from './layouts/app/AppLayout'
function App() {

  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />} >
            <Route index element={<Index />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/app" element={<AppLayout />} >
            <Route index element={<DashBoard />} />
          </Route>
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  )
}

export default App
