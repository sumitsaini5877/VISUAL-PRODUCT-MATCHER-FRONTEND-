import { Route, Routes } from "react-router-dom"
import Home from "../components/Home"
import ProductForm from "../components/ProductForm"
import ShowProduct from "../components/ShowProduct"


function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addProduct" element={<ProductForm/>}/>
        <Route path="/showProducts" element={<ShowProduct/>}/>
    </Routes>
  )
}

export default AppRoutes