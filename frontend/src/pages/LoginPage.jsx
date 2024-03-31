import { Link } from "react-router-dom"

export default function LoginPage() {
    return (
        <div className="mt-4 grow flex items-center justify-around">
          <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
              <form className="max-w-md mx-auto">
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password'/>
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