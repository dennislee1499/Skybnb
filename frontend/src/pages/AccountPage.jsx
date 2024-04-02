import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate, Link, useParams } from "react-router-dom";

export default function AccountPage() {

    const { ready, user } = useContext(UserContext);

    let { subpage } = useParams(); 
    if (subpage === undefined) {
        subpage = 'profile';
    }

    if (!ready) {
        return 'Loading...'
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }
    
    function linkClasses(type=null) {
        let classes = 'py-2 px-6';
        if (type === subpage) {
            classes += ' bg-primary text-white rounded-full'
        }
        return classes;
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link className={linkClasses('profile')} to={'/account'}>Profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>Bookings</Link>
                <Link className={linkClasses('accomodations')} to={'/account/accomodations'}>Accomodations</Link>
            </nav>
                { subpage === 'profile' && (
                    <div className="text-center max-w-lg mx-auto">
                        Logged in as { user.firstName } ({ user.email }) <br />
                        <button className="primary max-w-sm mt-2">Log out</button>
                    </div>
                )}
        </div>
    )
}