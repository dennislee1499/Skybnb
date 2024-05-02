import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import Booking from "../components/Booking";

export default function AccomodationPage() {
    const { id } = useParams();
    const [accomodation, setAccomodation] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false); 

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

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-white text-black min-h-screen">
                <div className="p-8 grid gap-4">
                    <div>
                        <h2 className="text-2xl mr-36">{accomodation.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 py-2 px-4 rounded-2xl shadow shadow-black">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    {accomodation?.photos?.length > 0 && accomodation.photos.map(photo => (
                        <div>
                            <img src={'http://localhost:4000/uploads/' + photo} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-2xl font-bold">{accomodation.title}</h1>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden p-8">
                    <div>
                        {accomodation.photos?.[0] && (
                            <div>
                                <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={'http://localhost:4000/uploads/' + accomodation.photos?.[0]} alt="" />
                            </div>
                        )}
                    </div>
                    <div className="grid">
                        {accomodation.photos?.[1] && (
                            <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={'http://localhost:4000/uploads/' + accomodation.photos?.[1]} alt="" />
                        )}
                        <div className="overflow-hidden">
                            {accomodation.photos?.[2] && (
                            <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2" src={'http://localhost:4000/uploads/' + accomodation.photos?.[2]} alt="" />
                        )}
                        </div>
                    </div>
                </div>
                <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-6 right-2 py-1 px-4 bg-white rounded-2xl border border-black">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
                    </svg>
                    Show all photos
                </button>
            </div>
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