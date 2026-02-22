import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import storageService from "../../appwrite-services/StorageService";
import { Button, Select, Input, TextEditor } from "../index";
import dbService from "../../appwrite-services/DatabaseService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function Blog({post}) {

    const {handleSubmit, register, control, setValue, getValue} = useForm({
        defaultValues: {
            title: post?.articleTitle || '',
            blogId: post?.$id || '',
            blogDesc: post?.articleBody || '',
            blogStatus: post?.articleStatus || '',
            blogImage: post?.articleImage || ''
        }
    });

    const navigate = useNavigate();

    const userData = useSelector((state) => state.userData);


    const onBlogSubmit = async(data) => {
        if(post){
            // Updating post
            const imageFile = data.image[0]? 
                await storageService.uploadFile(data.image[0]) : 
                null;
            if(imageFile){
                storageService.deleteFile(post.articleImage)
            }
            const updatedPost = await dbService.updatePost(post.$id, {
                ...data, 
                image: imageFile?imageFile.$id:undefined})
            if(updatedPost)
                navigate(`/post/${updatedPost.$id}`);                    

        } else {
            //Creating post
            const imageFile = data.image[0]? 
                await storageService.uploadFile(data.image[0]) :
                null;
            const dbPost = await dbService.createPost({
                ...data, 
                image: imageFile.$id, 
                userId: userData.$id});
            if(dbPost)
                navigate(`/post/${updatedPost.$id}`)
        }
    }

    const transformId = useCallback((titleValue) => {
        if(titleValue && typeof titleValue === 'string')
            return titleValue
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g,'-')
                .replace(/\s/g, '-')
        return ''
    }, [] )

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === 'title'){
                setValue('blogId', transformId(value), { shouldValidate: true})
            }
        })
        return () => subscription.unsubscribe()
    },[transformId, setValue])

    return(
        <form onSubmit={handleSubmit(onBlogSubmit)}>
            {/* left */}
            <div>
                <Input
                    label='Blog Title'
                    placeholder='title'
                    {...register('title', {required: true})}
                    />
                <Input
                    label='Blog Id'
                    placeholder='title'
                    {...register('blogId')}
                    />

                <Controller
                    control={control}
                    name='blogDesc'
                    rules={{ required: 'Content is required' }}
                    render={(field, fieldState) => {
                        <TextEditor  
                            defaultValue='my blog description' 
                            onChange={field.onChange} 
                            error={fieldState.error.message}
                        />
                    }} 
                />
            </div>

            {/* right */}
            <div>
                <Input
                    label='Upload Image'
                    type='file'
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register('blogImage')}
                />
                {post && (
                    <div>
                        <img
                            src={storageService.getFilePreview(post.articleId)}
                            alt='Image not found!'
                        />
                    </div>
                )}

                <Select
                    options={['active','archive','inactive']}
                    laber='Status'
                    {...register('blogStatus', {required: true})}
                />

                <Button type='submit'>
                    {post?'update':'submit'}
                </Button>
            </div>
        </form>
    )
}

export default Blog;