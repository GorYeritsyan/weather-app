import React from 'react'

const Cities = ({ cities }) => {
    return (
       <div className="flex flex-col gap-4">
           {cities?.map(city => (
               <div className="flex items-center gap-2" key={city.name}>
                   <div className="rounded-full text-lg px-5 py-2 font-semibold bg-blue-100 cursor-pointer">
                       {city?.name}, {city?.country}
                   </div>

                   <button className="font-semibold text-red-500 hover:text-red-600 active:bg-red-200 cursor-pointer hover:bg-red-100 px-3 py-1 rounded-full">
                       Remove
                   </button>
               </div>
           ))}
       </div>
    )
}
export default Cities
