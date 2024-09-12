import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'


function PostCard({$id,Title,featuredimage}) {
  return (
    <Link to={`/post/${$id}`}> {/*Link mein poora usrl nai dena padta , jaha pe ho vaha se hi aage chlo*/}
    <div className='w-full rounded-xl bg-gray-200'>
        <div className='w-full justify-center mb-4'>
            <img src={appwriteService.getFilePreview(featuredimage)} alt={Title} className='rounded-xl' />
        </div> {/*ham database ke andar id store karvare hain , post ki id to ye jo upar id di hai , vo id hai , image ki id har post ke ssath rhegi jo ese aayegi*/}
        <h2
        className='text-xl font-bold text-gray-800'>{Title}</h2>
        
    </div>
    </Link>
  )
}

export default PostCard