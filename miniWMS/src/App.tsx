import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import { TooltipProvider } from './components/ui/tooltip'
import HomeLayout from './layouts/home/HomeLayout'
import Contact from './pages/Contact'
function App() {

  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />} >
            <Route index element={<Index />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  )
}

export default App
