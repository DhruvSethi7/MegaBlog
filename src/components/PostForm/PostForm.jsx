import React,{useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {RTE,Button,Select,Input} from '../index'
import  appWriteService from '../../appwrite/config'
import {  useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm(
        {
            defaultValues:{
              title:post?.title||'',
              slug:post?.slug||'',
              content:post?.content||'',
              status:post?.status||'active'
            }
        }
    )
   const navigate=useNavigate()
   const userData=useSelector(state=>state.auth.userData)
 
   const submit=async(data)=>{
    for(const key in data){
        console.log(key+' '+data[key]);
    }
    console.log(userData);
    
    console.log('hii')
    const file=data.image[0]?await appWriteService.uploadFile(data.image[0]):null
    console.log(file);
    
    if(post){
       
        if(post.featured_image){
            await appWriteService.deleteFile(post.featured_image)
        }
        const dbPost=await appWriteService.updatePost(post.$id,{
            ...data,
            featured_image:file?file.$id:undefined
        })
        if (dbPost) {
            navigate(`/post/${dbPost.$id}`)
        }
    }
    else{
        const dbPost=appWriteService.createPost({
            user_id:userData.$id,
            ...data,
            featured_image:file?file.$id:undefined})
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }    
    }
   }

   const slugTransform=useCallback((value)=>{
    if (value && typeof(value)=='string') {
        const slug=value.toLowerCase().replace(/ /g,'-')
        setValue('slug',slug)
        return slug
    }
   })
   useEffect(()=>{
    const subscription=watch((value,name)=>{
        if (name=='title') {
            setValue('slug',slugTransform(value.title,))
        }

    })

    return ()=>subscription.unsubscribe()
   },[
    watch,
    slugTransform,setValue
   ])
   return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appWriteService.getFilePreview(post.featured_image)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
);
}

export default PostForm