import { NavLink } from "react-router-dom";
export default function Navbar() {
  
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <div className="text-2xl font-bold cursor-pointer">
        <NavLink to="/">MyApp</NavLink>
      </div>

      {/* NavLinks */}
      <ul className="flex gap-6 text-lg">
        <NavLink to="/" > Go To listing </NavLink>
       <NavLink to="/listings/new"> Create New Listing</NavLink>
      </ul>

      {/* Button */}
      <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300">
        Login
      </button>
    </nav>
  );
}