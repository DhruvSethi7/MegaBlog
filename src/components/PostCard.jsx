import React from 'react'
import appWriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
function PostCard({
    $id,
    title,
    featured_image
}) {
  
  return (
    <Link to={`post/${$id}`}>
        <div className='w-full  bg-orange-400 rounded-xl p-4'>
            <div className='mb-4 w-full justify-center'>
                <img className='rounded-xl' src={appWriteService.getFilePreview(featured_image)} alt={title} />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard