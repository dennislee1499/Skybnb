export default function Booking({accomodation}) {
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
                            <div className="text-xl">
                                <span className="font-medium">${accomodation.price}</span> night
                            </div>
                            <div className="border rounded-2xl mt-4">
                                <div className="flex">
                                    <div className="py-3 px-4">
                                        <label>Check-In:</label>
                                        <input type="date"/>
                                    </div>
                                    <div className="py-3 px-4 border-l">
                                        <label>Check-Out:</label>
                                        <input type="date"/>
                                    </div>
                                </div>
                                    <div className="py-3 px-4 border-t">
                                        <label>Guests:</label>
                                        <input type="number" value={1}/>
                                    </div>
                            </div>
                            <button className="primary mt-4">Reserve</button>
                        </div>
    )
}