import Post from '../models/Post.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'
import { deleteImage, uploadImage } from '../config/cloudinary.js'

const getUploadedImage = (files) => {
    const image = files?.image
    return Array.isArray(image) ? image[0] : image
}

const uploadPostImage = async (file) => {
    const result = await uploadImage(file)
    return {
        url: result.secure_url,
        publicId: result.public_id,
    }
}

// Create Post
export const createPost = async (req, res) => {
    let uploadedImage
    try {
        const { title, text } = req.body
        const user = await User.findById(req.userId)

        const image = getUploadedImage(req.files)
        if (image) {
            uploadedImage = await uploadPostImage(image)

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: uploadedImage.url,
                cloudinaryPublicId: uploadedImage.publicId,
                author: req.userId,
            })

            await newPostWithImage.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImage },
            })

            return res.json(newPostWithImage)
        }

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId,
        })
        await newPostWithoutImage.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImage },
        })
        res.json(newPostWithoutImage)
    } catch (error) {
        if (uploadedImage?.publicId) await deleteImage(uploadedImage.publicId).catch(() => {})
        console.error('Create post error:', error)
        res.status(500).json({ message: 'Unable to upload image or create post.' })
    }
}

// Get All Posts
export const getAll = async (req, res) =>{
    try {
        
        const posts = await Post.find().sort('-createAt')
        const popularPosts = await Post.find().limit(5).sort('-views')

        if(!posts){
            return res.json({message: "No posts available yet"})
        }

        res.json({posts, popularPosts})
    } catch (error) {
        res.json({message: 'Something went wrong.'})
    }
}


// Get Post By Id
export const getById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        })
        res.json(post)
    } catch (error) {
        res.json({ message: 'Something went wrong.' })
    }
}

export const getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.posts.map((post) => {
                return Post.findById(post._id)
            }),
        )

        res.json(list)
    } catch (error) {
        res.json({ message: 'Something went wrong' })
    }
}



// Update post
export const updatePost = async (req, res) => {
    let uploadedImage
    try {
        const { title, text, id } = req.body
        const post = await Post.findById(id)

        if (!post) return res.status(404).json({ message: 'Post not found.' })

        const image = getUploadedImage(req.files)
        const oldPublicId = post.cloudinaryPublicId
        if (image) {
            uploadedImage = await uploadPostImage(image)
            post.imgUrl = uploadedImage.url
            post.cloudinaryPublicId = uploadedImage.publicId
        }

        post.title = title
        post.text = text

        await post.save()

        if (image && oldPublicId && oldPublicId !== uploadedImage.publicId) {
            await deleteImage(oldPublicId).catch((error) => {
                console.error('Old Cloudinary image deletion error:', error)
            })
        }

        res.json(post)
    } catch (error) {
        if (uploadedImage?.publicId) await deleteImage(uploadedImage.publicId).catch(() => {})
        console.error('Update post error:', error)
        res.status(500).json({ message: 'Unable to update post.' })
    }
}

export const removePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post) return res.json({message: "That post does not exists"})

        await Post.findByIdAndDelete(req.params.id)
        
       await User.findByIdAndUpdate(req.userId, {
            $pull: { posts: req.params.id },
        })

        if (post.cloudinaryPublicId) {
            await deleteImage(post.cloudinaryPublicId).catch((error) => {
                console.error('Cloudinary image deletion error:', error)
            })
        }

        res.json({ message: 'Post has been deleted', _id: post._id })
    } catch (error) {
        res.json({ message: 'Something went wrong' })
    }
}

// Get Post Comments
export const getPostComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const list = await Promise.all(
            post.comments.map((comment) => {
                return Comment.findById(comment).populate('author', '_id username')
            }),
        )
        res.json(list)
    } catch (error) {
        res.json({ message: 'Something went wrong' })
    }
}
