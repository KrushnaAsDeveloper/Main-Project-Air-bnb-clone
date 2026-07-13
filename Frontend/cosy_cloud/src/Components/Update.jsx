import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function Update() {
    let navigate = useNavigate()
    let {id} = useParams();
    const [form, setForm] = useState({

    name: "",
    description: "",
    country: "",
    location: "",
    price :"", 
    image : null

  });
  const [loading , setLoading] = useState(false);

    console.log(id)
    useEffect(()=>  {
        async function updateData() {
        let formData = await axios.get(`/api/listings/${id}`)
        setForm(formData.data)
        }
        updateData()
    }, [])
    
  let handleInput = (event) =>{
    setForm({...form, [event.target.name] : event.target.value });
  }

  let handelFile = (event) =>{
    let file = event.target.files[0];
    setForm({...form, image : file})
  }
  let onSubmit = async (event) =>{

    event.preventDefault();
    setLoading(true)
    // const token = localStorage.getItem("token")
    const fd = new FormData();
    fd.append("name",  form.name)
    fd.append("description",  form.description)
    fd.append("country",  form.country)
    fd.append("location",  form.location)
    fd.append("price",  form.price)
    fd.append("image",  form.image)
    await axios.put(`/api/listings/${id}`, fd );  
    setForm({
        name: "",
    description: "",
    country: "",
    location: "",
    price:"", 
    image : null
    })
    setLoading(false)
    navigate(`/listings/${id}/details`)

  }
  return (
    <form
  onSubmit={onSubmit}
  className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8 border"
>
  <h1 className="text-3xl font-bold text-center mb-8">
    Create New Listing
  </h1>

  <div className="space-y-5">
    <div>
      <label className="block mb-2 font-medium">Listing Name</label>
      <input
        type="text"
        placeholder="Enter listing name"
        name="name"
        value={form.name}
        onChange={handleInput}
        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium">Description</label>
      <textarea
        placeholder="Enter description"
        name="description"
        rows="4"
        value={form.description}
        onChange={handleInput}
        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium">Image URL</label>
      <input
        type="file"
        name="image" 
        onChange={handelFile}
        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium">Price</label>
      <input
        type="number"
        placeholder="Enter price"
        name="price"value={form.price}
        onChange={handleInput}
        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium">Country</label>
      <input
        type="text"
        placeholder="Enter country"
        name="country"
        value={form.country}
        onChange={handleInput}
        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium">Location</label>
      <input
        type="text"
        placeholder="Enter location"
        name="location"
        value={form.location}
        onChange={handleInput}
        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
    >
      {
        loading ? "Updating.."  : "Update Listing"
      }
    </button>
  </div>
</form>
  )
}

export default Update