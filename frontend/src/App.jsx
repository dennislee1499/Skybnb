import './App.css'
import './index.css'
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from './context/UserContext';
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import Layout from './Layout';
import axios from 'axios';
import AccomodationsPage from './pages/AccomodationsPage';
import AccomodationsFormPage from './pages/AccomodationsFormPage';

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
          <Route path="/account" element={ <ProfilePage /> } />
          <Route path="/account/accomodations" element={ <AccomodationsPage /> } />
          <Route path="/account/accomodations/new" element={ <AccomodationsFormPage /> } />
          <Route path="/account/accomodations/:id" element={ <AccomodationsFormPage /> } />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App;
