import React, { useEffect, useState } from 'react'
import GuestUserNav from './users/GuestUserNav'
import UserNav from './users/UserNav'
// import AdminNav from './admin/AdminNav'

function OverAllNav() {

    const [user,setUser] = useState() 
    useEffect(()=>{
        setUser(sessionStorage.getItem("user"));
    },[user])

    console.log(user);
    

  return (
    <div>
      {user === null?(<GuestUserNav/>):(<UserNav/>)}
    </div>
  )
}

export default OverAllNav
