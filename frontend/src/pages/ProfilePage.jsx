import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import AccomodationsPage from "./AccomodationsPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);

    let { subpage } = useParams(); 
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout')
        setUser(null);
        setRedirect('/');
    }

    if (!ready) {
        return 'Loading...'
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={redirect}  />
    }

    return (
        <div>
            <AccountNav />
            { subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as { user.firstName } ({ user.email }) <br />
                    <button onClick={logout} className="primary max-w-xs mt-2">Log out</button>
                </div>
            )}
            { subpage === 'accomodations' && (
                <AccomodationsPage />
            )}
        </div>
    )
}