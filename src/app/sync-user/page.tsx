
import React from 'react'
import SyncUserComponent from '@/components/SyncUserComponent';
import { auth, currentUser } from '@clerk/nextjs/server'



const page = async () => {
    const {userId} = await auth()
    // const user = await currentUser()
    // const id = user?.id
  return (
    <div >
        
        <SyncUserComponent id={userId || ''} />
    </div>
  )
}

export default page