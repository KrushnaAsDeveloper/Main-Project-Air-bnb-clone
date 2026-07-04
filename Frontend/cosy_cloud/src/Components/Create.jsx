  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  export default function Create() {
    let navigate = useNavigate();
    const [form, setForm] = useState({
      name: "",
      description: "",
      country: "",
      location: "",
      price :""

    });
    let handleInput = (event) =>{
      setForm({...form, [event.target.name] : event.target.value });
    }
    let onSubmit = async (event) =>{

      event.preventDefault();
      const token = localStorage.getItem("token")
      console.log(token)
      let res = await axios.post("/api/listings", {form} , {headers :{
        authorization : `Bearer ${token}`
      }});  
      

      setForm({
          name: "",
      description: "",
      country: "",
      location: "",
      price:""
      })
      navigate("/")

    }

    return (
      <>
        
      <form
    onSubmit={onSubmit}
    className="max-w-xl mx-auto mt-10  shadow shadow-2xl shadow-taupe-700 rounded-xl p-8 "
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
          onChange={handleInput}
          className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Image URL</label>
        <input
          type="text"
          placeholder="https://example.com/image.jpg"
          name="image"
          onChange={handleInput}
          className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Price</label>
        <input
          type="number"
          placeholder="Enter price"
          name="price"
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
          onChange={handleInput}
          className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
      >
        Create Listing
      </button>
    </div>
  </form>
      </>
    );
  }
