import React, { useContext } from "react"


import { Context } from "../../Context/AuthContext";

export default function Private(){
  const { handleLogout } = useContext(Context);
  return(
    <>
      <h1>Private</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}