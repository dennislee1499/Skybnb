import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import PhotosUploader from "../components/PhotosUploader";
import HouseFeatures from "../components/HouseFeatures";
import axios from "axios";
import AccountNav from "../AccountNav";

export default function AccomodationsFormPage() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState([]);
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [rules, setRules] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false); 

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/accomodations/'+id).then(response => {
            const { data } = response; 
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description); 
            setFeatures(data.features);
            setRules(data.rules);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    async function savePlace(e) {
        e.preventDefault(); 
        const placeData = {
            title, address, addedPhotos, 
            description, features, rules, 
            checkIn, checkOut, maxGuests, price
        };

        if (id) {
            await axios.put('/accomodations', {
            id, ...placeData
        });
            setRedirect(true); 
        } else {
            await axios.post('/accomodations', placeData);
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/account/accomodations'} />
    }

    return (
        <>
            <AccountNav />
            <div className="flex justify-center">
                <form onSubmit={ savePlace }>
                    <h2 className="text-2xl mt-4">Title</h2>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title: Stunning House with Private Beach" />

                    <h2 className="text-2xl mt-4">Address</h2>
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />

                    <h2 className="text-2xl mt-4">Photos</h2>
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                    <h2 className="text-2xl mt-4">Description</h2>
                    <p className="text-gray-500 text-sm mt-2">Luxurious rental overlooking the beach</p>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} />

                    <h2 className="text-2xl mt-4">Features</h2>
                    <p className="text-gray-500 text-sm mt-2">Select all of the features of your home</p>
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2">
                        <HouseFeatures selected={features} onChange={setFeatures}  />
                    </div>

                    <h2 className="text-2xl mt-4">House Rules</h2>
                    <textarea value={rules} onChange={e => setRules(e.target.value)} />

                    <h2 className="text-2xl mt-4">Check in/ Check out</h2>
                    <p className="text-gray-500 text-sm mt-2">Remember to leave some time in between guests for proper cleaning!</p>
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                        <div className="mt-2 -mb-1">
                            <h3>Check In Time</h3>
                            <input type="text" 
                                    value={checkIn} 
                                    onChange={e => setCheckIn(e.target.value)} 
                                    placeholder="8AM" />
                        </div>

                        <div className="mt-2 -mb-1">
                            <h3>Check Out Time</h3>
                            <input type="text" 
                                    value={checkOut}
                                    onChange={e => setCheckOut(e.target.value)} 
                                    placeholder="10PM" />
                        </div>

                        <div className="mt-2 -mb-1">
                            <h3>Max Guests</h3>
                            <input type="number" 
                                    value={maxGuests} 
                                    onChange={e => setMaxGuests(e.target.value)} 
                                    placeholder="10" />
                        </div>

                        <div className="mt-2 -mb-1">
                            <h3>Price per night</h3>
                            <input type="number" 
                                    value={price} 
                                    onChange={e => setPrice(e.target.value)} 
                                    placeholder="$100" />
                        </div>
                    </div>
                        <button className="primary my-6">Save</button>
                </form>
            </div>
        </>
    )
}