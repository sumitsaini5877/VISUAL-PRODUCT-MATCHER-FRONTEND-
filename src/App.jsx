import {BrowserRouter} from "react-router-dom"
import Navbar from "./components/Navbar"
import AppRoutes from "./routes/AppRoutes"
// import Category from "./components/Category"




function App() {
  

  return (
    <>
    <BrowserRouter>
    <Navbar/>
     <AppRoutes/>
     
    </BrowserRouter>
    {/* <Category/> */}
     
    </>
  )
}

export default App
