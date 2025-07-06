import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import { TooltipProvider } from './components/ui/tooltip'
import HomeLayout from './layouts/home/HomeLayout'
function App() {

  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />} >
            <Route index element={<Index />} />
          </Route>
          
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  )
}

export default App
