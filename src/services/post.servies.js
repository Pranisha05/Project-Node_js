import { prisma } from "../db/index.js";

export const  getAllPostService = async() => {
   const allPosts = await prisma.post.findMany()
   return allPosts;
}

export const  createPostService = async(postData,userId) => {
    const post = await prisma.post.create({
        data:{
            content : postData.content,   
            authorId: userId,
        },
    })
    return post
}

export const getPostByPostIdService = async (postId) =>{
    
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    })
    if (!post){
        throw new Error("Not Found",{cause: "NotFoundCustomError"})
    }
    return post
}

export const getPostByIdService = async (userId) =>{
    
    const post = await prisma.post.findMany({
        where: {
            authorId: userId,
        },
    })
    if (!post){
        throw new Error("Not Found",{cause: "NotFoundCustomError"})
    }
    return post
}

export const updatePostService = async (postId,loggedInUserId,updateData) =>{
    const post = await prisma.post.findUnique({where: {id: postId}})
    if (!post){
        throw new Error("Not Found",{cause: "NotFoundCustomError"})
    }
    
    if(updateData.likeCase == "like"){
        post.likesCount = post.likesCount +1
    }
    else if(updateData.likeCase == "dislike"){
        if(post.likesCount > 0){
            post.likesCount = post.likesCount -1
        }
    }

    if(updateData.content){
        post.content = updateData.content
    }

    if (post.authorId !== loggedInUserId){
        throw new Error("You cannot perform this action",{cause: "UnauthorizedError"})
    }
    else{
        const data = await prisma.post.update({
            where: {
                id: postId
            },
            data :post
        })
        return data
    }
    
}

export const deletePostByIdService = async (postId,loggedInUserId) =>{
    const post = await prisma.post.findUnique({where: {id: postId}})
    if (!post){
        throw new Error("Not Found",{cause: "NotFoundCustomError"})
    }
    if (post.authorId == loggedInUserId){
        await prisma.post.delete({
            where: {
                id: postId
            },
        })
    }
    else{
        throw new Error("You cannot perform this action",{cause: "UnauthorizedError"})
    }
    return
}