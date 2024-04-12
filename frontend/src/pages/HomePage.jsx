import { useEffect, useState } from "react"
import axios from "axios";

export default function HomePage() {
    const [accomodations, setAccomodations] = useState([]);

    useEffect(() => {
        axios.get('/accomodations').then(res => {
            setAccomodations([...res.data]);
        })
    }, []);


    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            { accomodations.length > 0 && accomodations.map(place => (
                <div key={place._id}>
                    <div className="mb-2 bg-gray-500 rounded-2xl h-64 w-72">
                        {place.photos?.[0] && (
                         <img className="rounded-2xl object-cover aspect-square h-full w-full" src={'http://localhost:4000/uploads/' + place.photos?.[0] } alt=""></img>
                    )}
                    </div>
                    <h2 className="font-medium">{place.address}</h2>
                    <h3 className="text-sm text-gray-500">{place.title}</h3>
                    <div>
                        <span className="font-semibold">${place.price}</span> night
                    </div>
                </div>
            ))}
        </div>
    )
}