import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  async function loginUser(e) {
    e.preventDefault();
    try {
      const response = await axios.post('/login', {
        email, 
        password
      })
      setUser(response.data);
      setRedirect(true)
    } catch (error) {
      alert('Login Failed')
    }
  }

  if (redirect) {
    return <Navigate  to={'/'} />
  }

    return (
        <div className="mt-4 grow flex items-center justify-around">
          <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
              <form className="max-w-md mx-auto" onSubmit={loginUser}>

                <input type="email" 
                  placeholder='Email' 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}/>

                <input type="password" 
                  placeholder='Password' 
                  value={password} 
                  onChange={e => setPassword(e.target.value)}/>

                <button className="primary">Log in</button>
                <div className="text-center py-2 text-gray-500">
                    Don't have an Account?
                    <Link className="underline text-black" to={ '/signup' }>Signup now</Link>
                </div>
              </form>
          </div>
        </div>
    )
}