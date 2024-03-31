import './App.css'
import './index.css'
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import Layout from './Layout';
 
function App() {
  return (
    <Routes>
      <Route  path={"/"} element={ <Layout /> } >
        <Route index element={ <HomePage /> } />
        <Route path="/login" element={ <LoginPage /> } />
      </Route>
    </Routes>
    
  )
}

export default App
