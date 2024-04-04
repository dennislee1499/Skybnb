import './App.css'
import './index.css'
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from './pages/SignupPage';
import AccountPage from './pages/AccountPage';
import Layout from './Layout';
import axios from 'axios';
import { UserContextProvider } from './context/UserContext';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;
 
function App() {
    
  return (
    <UserContextProvider>
      <Routes>
        <Route  path={"/"} element={ <Layout /> } >
          <Route index element={ <HomePage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/signup" element={ <SignupPage /> } />
          <Route  path="/account/:subpage?" element={ <AccountPage /> } />
          <Route  path="/account/:subpage?/:action" element={ <AccountPage /> } />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App;
