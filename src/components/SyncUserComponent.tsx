'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { redirect } from 'next/navigation'
import axios from 'axios'

const SyncUserComponent = ({id}: {id: string}) => {
    const [username, setUsername] = useState('')
    const checkUserName = async () => {
        const response = await axios.post("/api/users/checkUserName", {
            username: username
        })
        console.log(response.data)
        if(response.data.available){
            const response = await axios.post('/api/users/addUserName' , {
                username: username,
                id: id
            })
            console.log(response.data.message)
            redirect(`/profile/${username}/edit`) 
        }else{
            console.log("Username is not available")
        }
    }
  return (
    <div>
        <Input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Button onClick={checkUserName}>Sync</Button>
    </div>
  )
}

export default SyncUserComponent