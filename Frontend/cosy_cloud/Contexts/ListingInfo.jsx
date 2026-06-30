import React from "react";
import { useEffect, useContext, createContext, useState } from "react";
import axios from "axios";

import { useViewTransitionState } from "react-router-dom";
export const ListingsContext = createContext();

export const ListingContextProvider = ({ children }) => {
const [tk , setTk ] = useState()
  const [listings, setListings] = useState([]);
  const t = localStorage.getItem("token");





  const addListings = (data) => {
    setListings((prev) => [...prev, data]);
  };
  return (
    <ListingsContext.Provider value={{ listings, addListings }}> 
      {children}
    </ListingsContext.Provider>
  );
};

export const useListingInfo = () => {
  return useContext(ListingsContext);
};
