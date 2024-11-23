import Header from "./components/navbar/Navbar"
import Login from "./pages/Login"
import Home from './pages/Home'
import About from './pages/About'
import Collection from './pages/Collection'

import { Routes,Route,Navigate,useLocation } from "react-router-dom"

function App() {


  return (
    <>
    
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
             <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element = {<Login />} /> 
                <Route path="*" element={<h1>PAGINA NO ENCONTRADA</h1>} />
            </Routes>
        </div>
    
    </>

  )
}

export default App