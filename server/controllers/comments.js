import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

export const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body

        if (!comment)
            return res.json({ message: 'Comment cannot be empty' })

        
        const newComment = new Comment({ comment, author: req.userId, post: postId })
        await newComment.save()

       
        try {
            await Post.findByIdAndUpdate(postId, {
                $push: { comments: newComment._id },
            })
        } catch (error) {
            console.log(error)
        }

       
        const populatedComment = await Comment.findById(newComment._id)
            .populate('author', 'username')

        res.json(populatedComment)
    } catch (error) {
        console.log(error)
        res.json({ message: 'Something went wrong.' })
    }
}


export const getPostComments = async (req, res) => {
    try {
        const postId = req.params.id
        const comments = await Comment.find({ post: postId }).populate('author', 'username')
        res.json(comments)
    } catch (error) {
        console.log(error)
        res.json({ message: 'Error receiving comments' })
    }
}
// Update Comment
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params
        const { comment } = req.body

        const currentComment = await Comment.findById(id)

        if (currentComment.author.toString() !== req.userId) {
            return res.json({ message: "No access" })
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { comment },
            { new: true }
        ).populate('author', '_id username') 

        res.json(updatedComment)
    } catch (error) {
        console.log(error)
        res.json({ message: "Error updating comment" })
    }
}

// Delete Comment
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params

        const currentComment = await Comment.findById(id)

       if (currentComment.author.toString() !== req.userId) {
    return res.json({ message: "No access" })
}

        const deletedComment = await Comment.findByIdAndDelete(id)

        await Post.updateMany(
            { comments: id },
            { $pull: { comments: id } }
        )

        res.json(deletedComment)
    } catch (error) {
        console.log(error)
        res.json({ message: "Error deleting comment" })
    }
}
