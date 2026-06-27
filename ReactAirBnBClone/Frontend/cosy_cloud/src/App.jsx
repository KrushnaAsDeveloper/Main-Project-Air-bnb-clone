import { useState } from 'react'
import Listing from './Components/Listings'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Create from './Components/Create'
import { ListingContextProvider } from '../Contexts/ListingInfo'
function App() {

  return (
    
     <Listing/>
  )
}

export default App
