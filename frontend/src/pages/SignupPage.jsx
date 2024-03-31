import { Link } from "react-router-dom"

export default function SignupPage() {
    return (
        <div className="mt-4 grow flex items-center justify-around">
          <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Sign Up</h1>
              <form className="max-w-md mx-auto">
                <input type="text" placeholder='First name'/>
                <input type="text" placeholder='Last name'/>
                <div className="mt-2 mb-6 text-gray-400 text-xs">
                  Make sure it matches the name on your government ID.
                </div>
                <input type="email" placeholder='Email'/>
                  <div className="mt-2 mb-6 text-gray-400 text-xs">
                    We'll email you trip confirmations and receipts.
                  </div>
                <input type="password" placeholder='Password'/>
                <button className="primary">Log in</button>
                <div className="text-center py-2 text-gray-500">
                    Already a member?
                    <Link className="underline text-black" to={ '/login' }>Login</Link>
                </div>
              </form>
          </div>
        </div>
    )
}