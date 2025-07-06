import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import { TooltipProvider } from './components/ui/tooltip'
import HomeLayout from './layouts/home/HomeLayout'
import Contact from './pages/Contact'
import { DashBoard } from './pages/app/DashBoard'
import AppLayout from './layouts/app/AppLayout'
import ProductCatalog from './pages/app/products/ProductCatalog'
import AddProduct from './pages/app/products/AddProduct'
import ProductLayout from './layouts/app/products/ProductLayout'
import Categories from './pages/app/categories/Categories'
import Suppliers from './pages/app/suppliers/Suppliers'
import AddSupplier from './pages/app/suppliers/AddSupplier'
import WarehouseCatalog from './pages/app/warehouses/WarehouseCatalog'
import AddWarehouse from './pages/app/warehouses/AddWarehouse'


function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />} >
            <Route index element={<Index />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          <Route path="/app/" element={<AppLayout />} >
            <Route index element={<DashBoard />} />

            <Route path="products/" element={<ProductLayout />} >
              <Route index element={<ProductCatalog />} />
              <Route path="add" element={<AddProduct />} />
            </Route>
            <Route path="categories" element={<Categories />} />

            <Route path="suppliers" element={<Suppliers />} />
            <Route path="suppliers/add" element={<AddSupplier />} />
            <Route path='warehouses' element={<WarehouseCatalog />} />
            <Route path="warehouses/add" element={<AddWarehouse />} />
            {/* <Route path="warehouses/:id" element={<WarehouseDetail />} /> */}

          </Route>
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  )
}

export default App
