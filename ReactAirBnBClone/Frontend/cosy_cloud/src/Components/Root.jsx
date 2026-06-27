import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { ListingContextProvider } from '../../Contexts/ListingInfo'
function Root() {
  return (
    <>
    
    <ListingContextProvider>
      <Navbar/>
    <Outlet/>
    <Footer/>
    </ListingContextProvider>
    </>

  )
}

export default Root