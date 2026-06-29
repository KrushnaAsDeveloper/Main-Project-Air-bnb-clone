import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'

function Expand() {
  const [listing, setListing] = useState([]);
  const navigate = useNavigate()
  const {id} = useParams();
  
useEffect(()=>{
  const fetchSingleData = async () =>{
  const res = await axios.get(`http://192.168.0.102:5000/listings/${id}` )
  setListing(res.data)
}
fetchSingleData()
}, [])

  const deleteListing =  ()=>{
    const token = localStorage.getItem("token")
     axios.delete(`http://192.168.0.102:5000/listings/${id}`, { headers: {
    Authorization: `Bearer ${token}` // 👈 send it
  }})
    
    navigate("/")
  }
  return (
    <>
     <div className="w-[80vw] mx-auto my-10 bg-gray-100 relative rounded-2xl shadow-md  ">
      {/* Title */}
      <div className="px-6 pt-6 pb-4 ">
        <h1 className="text-4xl font-semibold text-gray-900">{listing.name}</h1>
      </div>

      {/* Image */}
      <img
        src={listing.image}
        alt={listing.title}
        className="w-full h-150 object-cover"
      />

      {/* Details */}
      <div className="px-6 py-6 space-y-4">
        {/* Description */}
        <p className="text-gray-600 leading-relaxed">{listing.description}</p>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-rose-500">${listing.price}</span>
          <span className="text-gray-400 text-sm">/ night</span>
        </div>

        {/* Country & Location */}
        <div className="flex flex-col gap-1 text-sm text-gray-500">
          <span>🌍 <span className="font-medium text-gray-700">{listing.country}</span></span>
          <span>📍 <span className="font-medium text-gray-700">{listing.location}</span></span>
        </div>
      </div>
    <div className='flex absolute right-5 bottom-5'>
      <button className=" cursor-pointer px-6 py-3 bg-red-600 rounded-2xl mx-2 text-white " onClick={()=>{navigate(`/listings/${id}/edit`)}}>Update</button>
    <button className=" cursor-pointer px-6 py-3 bg-red-600 rounded-2xl mx-2 text-white" onClick={deleteListing}>Delete</button>
    </div>
    </div>
    </>
  )
}

export default Expand