import React from 'react'
import AdminNavBar from '../components/AdminNavBar'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import adminpic from "../assets/adminpic.jpg"
import Footer from '../components/Footer'

export default function AdminProfile() {
  

  const[id, setId]= useState()
  const[add, setAdd]= useState()

  useEffect(() => {
    //Runs on first render
    setId(localStorage.getItem('userId'))
    setAdd(localStorage.getItem("userAdd").slice(0, 8))
    
  }),[];
  
  return (
    <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
        <AdminNavBar></AdminNavBar>
        <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="relative">
            <div className="w-48 h-48 bg-sky-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-sky-500">
            <Image className="rounded-full"src={adminpic}></Image>
            </div>
            </div>
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <h1 className="text-xl">Welcome back admin!</h1>
            </div>
    </div>

    <div className="mt-20 text-center border-b pb-12">
        <h1 className="text-4xl font-medium text-gray-700">Election Admin🛠️: {id}</h1>
        <h1 className="text-2xl font-small text-gray-700">Wallet Address📒: {add}....</h1>
    </div>

    </div>
        </div>
     <Footer></Footer>   
    </div>
  )

  
}
