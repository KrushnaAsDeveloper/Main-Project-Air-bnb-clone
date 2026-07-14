import { useEffect } from "react";
import { useState } from "react";
import "../index.css";
import ListCard from "./ListCard";
import axios from "axios";
import { useAuth } from "../../Contexts/AuthContext";
import { NavLink } from "react-router-dom";
export default function Listing() {
const [listings, setListings] = useState([])
const [loading , setLoading] = useState(false)
let {token, user} = useAuth()
console.log("user preview", user?.userId);

    useEffect(() => {
      setLoading(true)
      const fetchData = async () => {
      const token = localStorage.getItem("token")

        let res = await axios.get("/api/listings", {headers : {Authorization : `Bearer ${token}`}});
     
      setListings(res.data);
      setLoading(false)
    }
      fetchData();
    }, [])
    
  return (
    
    <>
     {
    loading  ? <div className="flex justify-center items-center w-full h-screen"><svg fill="hsl(228, 97%, 42%)" width={200} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="12" r="3"><animate id="spinner_qFRN" begin="0;spinner_OcgL.end+0.25s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle><circle cx="12" cy="12" r="3"><animate begin="spinner_qFRN.begin+0.1s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle><circle cx="20" cy="12" r="3"><animate id="spinner_OcgL" begin="spinner_qFRN.begin+0.2s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle></svg></div> :
      <div className="flex justify-center flex-wrap min-h-screen">
        
        {listings.map((elem) => (
         
            
         <ListCard key={elem._id} listing={elem} /> 
          
          
          
        ))}
      </div>
}
    </>
  );
}
