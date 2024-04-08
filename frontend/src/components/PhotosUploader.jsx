import axios from "axios";
import { useState } from "react";

export default function PhotosUploader({ addedPhotos, onChange }) {
    const [photoLink, setPhotoLink] = useState('');

     async function addPhotoBylink(e) {
        e.preventDefault();
        const { data: filename } = await axios.post('/upload-with-link', { link: photoLink })
        onChange(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }

    async function uploadPhoto(e) {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        const { data: filename } = await axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        onChange(prev => {
            return [...prev, ...filename];
        });
    }

    return (
        <>
            <div className="flex gap-2">
                <input type="text" 
                        value={photoLink} 
                        onChange={e => setPhotoLink(e.target.value)} 
                        placeholder={ 'Add using a link' } />
                <button onClick={addPhotoBylink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photo</button>
            </div>
            
            <div className="mt-4 grid gap-2 grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
                { addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                    <div className="h-32 flex" key={link}>
                        <img className="rounded-2xl w-full object-cover" src={ 'http://localhost:4000/uploads/' + link } alt={`Uploaded Image ${index + 1}`} />
                    </div>
                ))}
                <label type="button" className="h-32 cursor-pointer flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-500">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                    Upload
                </label>
            </div>
        </>
    )
}