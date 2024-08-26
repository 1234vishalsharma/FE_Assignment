import React, { useState } from 'react'

const SearchBox = () => {
  const [search , setSearchText] = useState("");
  const handelChange = (e) => {
    alert("Search Fucntionality disabled");
    return;   
  }
  return (
    <div className=" flex gap-1 pl-4 items-center h-8 bg-blue-100 w-96 overflow-hidden border-2 rounded-md border-blue-200 max-md:hidden">
      <img className="h-6 w-6" src="./search.svg" alt="..." />
      <input onClick={handelChange} type="text" className="flex items-center h-full w-full bg-blue-100 outline-none border-0" placeholder="Search anything..."/>
    </div>
  )
}

export default SearchBox
