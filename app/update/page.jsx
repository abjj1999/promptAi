"use client"
import React, {useEffect, useState} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@/components/Form';


const Edit = () => {
  const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id');
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({prompt: '', tag: ''})

  useEffect(() => {
    const getPrompt = async () => {
        const res = await fetch(`/api/prompt/${promptId}`)
        const data = await res.json()
        setPost({
            prompt: data.prompt,
            tag: data.tag,
        })


    }
    if(promptId) getPrompt();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    if(!promptId) {
        alert('promptId is not defined')
    }
    try {
        const response = await fetch(`/api/prompt/${promptId}`, {
            method: 'PATCH',
            body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
            }),
        })
        if (response.ok) {
            router.push(`/`)
        }
        
    } catch (error) {
        
    }
  }

  return (
    <Form 
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default Edit
