import { useState } from "react"
import { differenceInCalendarDays } from "date-fns"

export default function Booking({ accomodation }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1); 
    let numberOfNights = 0; 
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
                            <div className="text-xl">
                                <span className="font-medium">${accomodation.price}</span> night
                            </div>
                            <div className="border rounded-2xl mt-4">
                                <div className="flex">
                                    <div className="py-3 px-4">
                                        <label>Check-In:</label>
                                        <input type="date" 
                                               value={checkIn} 
                                               onChange={e => setCheckIn(e.target.value)}/>
                                    </div>
                                    <div className="py-3 px-4 border-l">
                                        <label>Check-Out:</label>
                                        <input type="date" 
                                               value={checkOut} 
                                               onChange={e => setCheckOut(e.target.value)}/>
                                    </div>
                                </div>
                                    <div className="py-3 px-4 border-t">
                                        <label>Guests:</label>
                                        <input type="number"
                                               value={numberOfGuests} 
                                               onChange={e => setNumberOfGuests(e.target.value)}/>
                                    </div>
                                    {numberOfNights > 0 && (
                                        <div className="py-3 px-4 border-t">
                                            <label>Full Name:</label>
                                            <input type="text"
                                                   value={name} 
                                                   onChange={e => setName(e.target.value)}/>
                                            <label>Phone Number:</label>
                                            <input type="tel"
                                                   value={phone} 
                                                   onChange={e => setPhone(e.target.value)}/>
                                        </div>
                                    )}
                            </div>
                            <button className="primary mt-4">
                                Reserve
                                {numberOfNights > 0 && (
                                    <span> ${ numberOfNights * accomodation.price }</span>
                                )}
                            </button>
                        </div>
    )
}