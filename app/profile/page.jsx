"use client"
import { useSession } from 'next-auth/react'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'

import Profile from '@/components/Profile'

const ProfilePage = () => {
    const { data: session } = useSession()
    const router = useRouter()
    
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
          const res = await fetch(`/api/users/${session?.user?.id}/prompts`);
          const data = await res.json();
          console.log(data);
          setPosts(data);
        }
        if(session?.user.id) fetchPosts();
      }, [session?.user.id]);
    
    const handleEdit = async (post) => {
        router.push(`/update?id=${post._id}`)

    }
    const handleDelete =async (post) => {
        try {
            const response = await fetch(`/api/prompt/${post._id.toString()}`, {
                method: 'DELETE',
            })
            const filteredPosts = posts.filter((p) => p._id !== post._id)
            setPosts(filteredPosts)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Profile
        name="My"
        desc = "Welcome to my profile"
        data = {posts}
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
    />
  )
}

export default ProfilePage
