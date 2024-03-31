import { Link } from "react-router-dom"
import { useState } from "react";
import axios from "axios";

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signupUser(e) {
    e.preventDefault();
    try {
      await axios.post('/register', {
        firstName,
        lastName,
        email,
        password,
      });
      alert('Registration complete')
    } catch (error) {
      alert('Registration failed')
    }
  }

    return (
        <div className="mt-4 grow flex items-center justify-around">
          <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Sign Up</h1>

              <form className="max-w-md mx-auto" onSubmit={signupUser}>
                <input type="text" 
                      placeholder='First name' 
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}/>
                <input type="text" 
                      placeholder='Last name' 
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}/>
                <div className="mt-2 mb-6 text-gray-400 text-xs">
                  Make sure it matches the name on your government ID.
                </div>

                <input type="email" 
                      placeholder='Email' 
                      value={email} 
                      onChange={e => setEmail(e.target.value)}/>
                  <div className="mt-2 mb-6 text-gray-400 text-xs">
                    We'll email you trip confirmations and receipts.
                  </div>

                <input type="password" 
                      placeholder='Password' 
                      value={password} 
                      onChange={e => setPassword(e.target.value)}/>

                <button className="primary">Create Account</button>
                <div className="text-center py-2 text-gray-500">
                    Already a member?
                    <Link className="underline text-black" to={ '/login' }>Login</Link>
                </div>
              </form>
          </div>
        </div>
    )
}