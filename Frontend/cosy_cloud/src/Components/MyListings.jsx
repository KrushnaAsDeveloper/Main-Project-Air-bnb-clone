import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react'
import MyListCard from './MyListCard';
import { useAuth } from '../../Contexts/AuthContext';
import api from '../api/axios.api';

function MyListings() {
    const [myListings, setMyListings] = useState([]);
    useEffect(()=>{
        const mylistings = async () =>{
            try {
                const token = localStorage.getItem("token")
            console.log(token)
           let res = await api.get("/api/listings/my", {headers : {Authorization : `Bearer ${token}`}})
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
       <div className="flex justify-center flex-wrap min-h-screen">
        {myListings.map((elem) =>(
        <MyListCard key={elem._id} listing={elem} />
       ))}
       </div>
    </>
  )
}

export default MyListings