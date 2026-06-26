import { useEffect } from "react";
import { useState } from "react";
import "../index.css";
import { useListingInfo } from "../../Contexts/ListingInfo";
import ListCard from "./ListCard";
export default function Listing() {
  const { listings } = useListingInfo();
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
