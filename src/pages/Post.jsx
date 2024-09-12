import React from 'react'
import { Link , useParams , useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'
import {Button , Container } from "../components"
import { useSelector } from 'react-redux'
import appwriteService from "../appwrite/config";

function Post() {
    const [post, setPost] = useState(null)
    const {slug } =useParams()
    const navigate = useNavigate()

    const userData = useSelector((state)=>state.auth.userData)

    const isAuthor = post && userData? post.userid===userData.$id:false

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post) setPost(post)
                else navigate("/ ")

            })
        }
        else navigate("/")
    }, [slug,navigate])

    const deletePost  = ()=>{
        appwriteService.deletePost(post.$id).then((status)=>{
            if(status){
                appwriteService.delete(post.featuredimage);
                navigate("/")
            }
        });
    };
    return post ?(
        <div className='py-8'>
            <Container>
                <div 
                className=' w-full flex p-2 justify-center relative border rounded-xl mb-4'
                >
                    <img
                    src={appwriteService.getFilePreview(post.featuredimage)}
                    alt={post.Title}
                    className=' object-cover rounded-xl'/>

                    {isAuthor && (
                        <div className='absolute top-6 right-6 p-2'>
                            <Link to={`/edit-post/${post.$id}`} >
                            <Button bgColor="bg-green-500" className='bg-blue-500 text-white'>Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
                            </div>
                    )}
                </div>
                <div className='w-full mb-6'>
                    <h1 className='text-2xl font-bold'>{post.Title}</h1>
                    
                    </div> 
                    <div className='browser-css'>{parse(post.content)}</div>
            </Container>
        </div>
    ):null
    
  
}

export default Post