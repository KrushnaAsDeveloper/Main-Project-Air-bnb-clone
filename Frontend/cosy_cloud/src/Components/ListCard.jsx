import { NavLink, useNavigate, useParams } from "react-router-dom";

export default function ListCard({ listing }) {
  const navigate = useNavigate();

 
  return (
    <>
      <div className="flex flex-wrap">
        <NavLink to={`listings/${listing._id}/details`}>

        <div className="w-[30rem] bg-white rounded-2x overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300  p-10 m-10">
          <div className="w-full h-[16rem] overflow-hidden">
            <img
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              src={listing.image}
              alt={listing.name}
            />
          </div>

          <div className="p-5 flex flex-col gap-3 ">
            <div className="text-2xl font-bold text-gray-800">
              {listing.name}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {listing.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                {listing.country}
              </span>

              <span className="font-medium">📍 {listing.location}</span>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="text-2xl font-bold text-indigo-600">
                ₹{listing.price}
              </div>

              <button onClick={()=>{navigate(``)}}
                className="bg-indigo-600 cursor-pointer text-white px-5 py-2 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all duration-200"
              >
                Explore
              </button>
            </div>
          </div>
        </div>
        </NavLink>
      </div>
    </>
  );
}
