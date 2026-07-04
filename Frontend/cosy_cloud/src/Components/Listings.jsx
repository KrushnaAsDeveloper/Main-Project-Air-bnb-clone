import { useEffect } from "react";
import { useState } from "react";
import "../index.css";
import ListCard from "./ListCard";
import axios from "axios";
import { useAuth } from "../../Contexts/AuthContext";
import { NavLink } from "react-router-dom";
export default function Listing() {
const [listings, setListings] = useState([])
let {token, user} = useAuth()
console.log("user preview", user?.userId);
    useEffect(() => {
      const fetchData = async () => {
      const token = localStorage.getItem("token")

        let res = await axios.get("/api/listings", {headers : {Authorization : `Bearer ${token}`}});
     
      setListings(res.data);
    }
      fetchData();
    }, [])
    
  return (
    
    <>
      
      <div className="flex justify-center flex-wrap min-h-screen">
        
        {listings.map((elem) => (
         
            
         <ListCard key={elem._id} listing={elem} /> 
          
          
          
        ))}
      </div>
      
    </>
  );
}
