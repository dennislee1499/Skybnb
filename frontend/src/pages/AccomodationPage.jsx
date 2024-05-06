import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import Booking from "../components/Booking";
import AccomodationGallery from "../AccomodationGallery";

export default function AccomodationPage() {
    const { id } = useParams();
    const [accomodation, setAccomodation] = useState(null); 

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get(`/accomodations/${id}`).then(res => {
                setAccomodation(res.data);
            })
        }
    }, [id]);

    if (!accomodation) return '';


    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-2xl font-bold">{accomodation.title}</h1>
            <AccomodationGallery accomodation={accomodation} />
            <h2 className="font-semibold mt-2">{accomodation.address}</h2>
            <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                    <div>
                        <div className="my-5">
                            <h2 className="font-semibold text-xl">Description</h2>
                            {accomodation.description}
                        </div>
                        Check-In: {accomodation.checkIn} <br />
                        Check-Out: {accomodation.checkOut} <br />
                        Max Guests: {accomodation.maxGuests} <br />
                    </div>
                    <div>
                        <Booking accomodation={accomodation}/>
                    </div>
            </div>
        </div>
    )
}