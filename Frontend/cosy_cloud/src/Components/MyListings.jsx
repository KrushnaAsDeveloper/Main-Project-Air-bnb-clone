import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react'

function MyListings() {
    const [myListings, setMyListings] = useState([]);
    useEffect(()=>{
        const mylistings = async () =>{
            try {
                const token = localStorage.getItem("token")
            console.log(token)
           let res = await axios.get("http://192.168.0.102:5000/listings/my", {headers : {Authorization : `Bearer ${token}`}})
        setMyListings(res.data)
            console.log(res.data)
            } catch (error) {
                console.log(error.response?.data)
            }
        } 
        mylistings();
    }, [])
  return (
    <>
        <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Listings</h1>
      {myListings.length === 0 ? (
        <p>You haven't created any listings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myListings.map((listing) => (
            <div key={listing._id} className="border rounded-xl p-4 shadow">
              <img src={listing.image} className="w-full h-48 object-cover rounded-lg mb-3" />
              <h3 className="font-semibold text-lg">{listing.name}</h3>
              <p className="text-gray-500">{listing.location}, {listing.country}</p>
              <p className="text-green-600 font-bold mt-1">₹{listing.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>

    </>
  )
}

export default MyListings