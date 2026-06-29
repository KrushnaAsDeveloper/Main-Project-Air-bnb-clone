import React from "react";
import { useEffect, useContext, createContext, useState } from "react";
import axios from "axios";
export const ListingsContext = createContext();


export const ListingContextProvider = ({children}) =>{
  const [listings, setListings] = useState([]);
  useEffect(()=>{
    const fetchData = async () => {
                let res = await axios.get("http://192.168.0.102:5000/listings")  
                setListings(res.data)    
            }
            fetchData()
  }, [])

  const addListings = (data)=>{
    setListings((prev)=>[...prev, data])
  }
  return (
    <ListingsContext.Provider value={{listings, addListings}}>
      {children}
    </ListingsContext.Provider>
  )
}

export const useListingInfo = () => {
  return useContext(ListingsContext);
};
