'use client'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { redirect, useRouter } from 'next/navigation'
import axios from 'axios'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

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

    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const checkCurrentUser = async () => {
          try {
            const response = await fetch('/api/users/profile')
            const data = await response.json()
            
            setUsername(data.username)
            
            if (data.username) {
              router.push('/dashboard')
            }
          } catch (error) {
            console.error('Error checking user profile:', error)
          } finally {
            setIsLoading(false)
          }
        }
    
        checkCurrentUser()
      }, [router])
    
      if (isLoading) {
        return <div className="p-4">Loading user information...</div>
      }
  return (
    <div className="flex items-center justify-center min-h-screen ">
    <Card className="w-full max-w-sm pt-5">
      <CardContent>
        <div className="space-y-4">
          <div className='space-y-4'>
            <label htmlFor="username">Username</label>
            <Input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={checkUserName} className="w-fit">
          Confirm
        </Button>
      </CardFooter>
    </Card>
  </div>
  )
}

export default SyncUserComponent