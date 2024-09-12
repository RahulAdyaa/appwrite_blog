import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  //state meinn jo bhi userdata hai uss user ka vo aajayega

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  //for updaating post , pehle new post ko upload krdo , aur fir purani wali ko delete krdo
  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      // abbb updatepost mein hme slug(image ki id ) , title , content , featuredimage, status dena padega.

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        // featureimage field ko pverwrite krna padega
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // else case mein kuch update krne ko nahi hai , user ek naya form create krna chahta hai....
      //pehle kaam file upload ka kro
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userid: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  // we have two input fileds , slug and transform, title ko watch krna hai aur slug ke andar value change krni hai. If user puts a space in between then convert it into dash

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return ''
  }, []);

  React.useEffect(()=>{
    const subscription = watch((value,{name})=>{
        if(name === 'title') {
            setValue('slug' , slugTransform(value.title,{shouldValidate:true}))}
    })
    // useeffect mein hme ek return mein callback milta ha

    return()=>{
        subscription.unsubscribe()
    }

  },[watch,slugTransform,setValue])
  return (
  <form 
  onSubmit={handleSubmit(submit)}
  className="flex flex-wrap"
  >
    <div
    className="w-2/3 px-2"
    >
        <Input
        label="title"
        placeholder="title"
        className="mb-4"
        {...register('title',{required:true})}
        
        />
        <Input
        label="slug"
        placeholder="slug"
        className="mb-4"
        {...register('slug',{required:true})}
        onInput={(e)=>{
            setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate:true});
        }}
        />
        <RTE
        label="content:" 
        placeholder="content"
        name = "content"
        control={control}
        defaultValue={getValues("content")}
        />
    </div>
    <div
    className="w-1/3 px-2">
        <Input
        
        label="Featured Image"
        placeholder="Featured Image"
        type="file"
        className="mb-4"
        accept="image/png , image/jpg , image/jpeg , image/gif"
        {...register('featuredImage',{required:!post})}
        />
        {post && (
            <div
            className="w-full mb-4"
            >
                <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"/>

            </div>
        )}
        <Select
        options={['active' , 'inactive']}
        label="Status"
        className="mb-4"
        {...register('status',{required:true})}
        />
        <Button
        type="submit"
        className="w-full"
        bgColor= {post ? "bg-green-500":undefined}
        >{post ? "Update" : "Submit"}</Button>

    </div>
  </form>
  )
}

export default PostForm;
