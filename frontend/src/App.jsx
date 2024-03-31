import './App.css'
import './index.css'
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from './pages/SignupPage';
import Layout from './Layout';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;
 
function App() {
  return (
    <Routes>
      <Route  path={"/"} element={ <Layout /> } >
        <Route index element={ <HomePage /> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/signup" element={ <SignupPage /> } />
      </Route>
    </Routes>
    
  )
}

export default App
