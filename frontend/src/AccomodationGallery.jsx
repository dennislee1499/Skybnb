import { useState } from "react";

export default function AccomodationGallery({ accomodation }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

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
        <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-2 gap-2 items-stretch">

                {accomodation.photos?.[0] && (
                    <img
                        onClick={() => setShowAllPhotos(true)}
                        src={`http://localhost:4000/uploads/${accomodation.photos[0]}`}
                        alt=""
                        className="w-full h-95 object-cover rounded-lg cursor-pointer"
                    />
                )}

                <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full">
                    {accomodation.photos?.slice(1, 5).map((photo, index) => (
                        <img
                            key={index}
                            onClick={() => setShowAllPhotos(true)}
                            src={`http://localhost:4000/uploads/${photo}`}
                            alt=""
                            className="w-full h-47 object-cover rounded-lg cursor-pointer"
                        />
                    ))}
                </div>
                <button 
                onClick={() => setShowAllPhotos(true)} 
                className="flex items-center gap-1 absolute bottom-5 right-12 py-1 px-4 bg-white rounded-2xl border border-black text-black shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
                </svg>
                Show all photos
            </button>
            </div>
        </div>
    );
}