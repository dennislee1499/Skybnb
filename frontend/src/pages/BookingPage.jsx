import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AccomodationGallery from "../AccomodationGallery"
import BookingDates from "../BookingDates"

export default function BookingPage() {
    const { id } = useParams()
    const [booking, setBooking] = useState(null)

    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(res => {
                const foundBooking = res.data.find(({_id}) => _id === id)
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            }) 
        }
    }, [id]);

    if (!booking) {
        return '';
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.accomodation.title}</h1>
            <h2 className="font-semibold">{booking.accomodation.address}</h2>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl items-center flex justify-between">
                <div>
                    <h2 className="text-2xl mb-4">Your booking information:</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div>Total Price</div>
                    <div className="text-3xl">${booking.price}</div>
                </div>
            </div>
            <AccomodationGallery accomodation={booking.accomodation} />
        </div>
    )
}