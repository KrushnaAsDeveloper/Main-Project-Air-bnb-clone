import { useEffect } from "react";
import { useState } from "react";
import "../index.css";
import { useListingInfo } from "../../Contexts/ListingInfo";
import ListCard from "./ListCard";
import axios from "axios";
import { useAuth } from "../../Contexts/AuthContext";
import { NavLink } from "react-router-dom";
export default function Listing() {
const [listings, setListings] = useState([])
let token = useAuth()
    useEffect(() => {
      const fetchData = async () => {
      const token = localStorage.getItem("token")

        let res = await axios.get("http://192.168.0.102:5000/listings", {headers : {Authorization : `Bearer ${token}`}});
     
      setListings(res.data);
    }
      fetchData();
    }, [])
    const {user} = useAuth()
  return (
    
    <>
      {!user ? <h1 className="h-screen w-full my-20 text-4xl uppercase font-bold text-center"> there is no listing  <NavLink className="underline text-blue-500" to="/login"> plz Login</NavLink></h1> :
      <div className="flex justify-center flex-wrap min-h-screen">
        
        {listings.map((elem) => (
         
            
         <ListCard key={elem._id} listing={elem} /> 
          
          
          
        ))}
      </div>
      }
      
    </>
  );
}
