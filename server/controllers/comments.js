import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

export const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body

        if (!comment)
            return res.json({ message: 'Комментарий не может быть пустым' })

        // Сохраняем новый комментарий с автором и привязкой к посту
        const newComment = new Comment({ comment, author: req.userId, post: postId })
        await newComment.save()

        // Обновляем пост, добавляя комментарий
        try {
            await Post.findByIdAndUpdate(postId, {
                $push: { comments: newComment._id },
            })
        } catch (error) {
            console.log(error)
        }

        // Получаем полный объект комментария с username автора
        const populatedComment = await Comment.findById(newComment._id)
            .populate('author', 'username')

        res.json(populatedComment)
    } catch (error) {
        console.log(error)
        res.json({ message: 'Что-то пошло не так.' })
    }
}


export const getPostComments = async (req, res) => {
    try {
        const postId = req.params.id
        // Получаем все комментарии для поста и добавляем username автора
        const comments = await Comment.find({ post: postId }).populate('author', 'username')
        res.json(comments)
    } catch (error) {
        console.log(error)
        res.json({ message: 'Ошибка получения комментариев' })
    }
}
// Update Comment
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params
        const { comment } = req.body

        const currentComment = await Comment.findById(id)

        if (currentComment.author.toString() !== req.userId) {
            return res.json({ message: "Нет доступа" })
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { comment },
            { new: true }
        ).populate('author', '_id username') 

        res.json(updatedComment)
    } catch (error) {
        console.log(error)
        res.json({ message: "Ошибка обновления комментария" })
    }
}

// Delete Comment
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params

        const currentComment = await Comment.findById(id)

        // ❗ проверка владельца
        if (currentComment.author.toString() !== req.userId) {
            return res.json({ message: "Нет доступа" })
        }

        const deletedComment = await Comment.findByIdAndDelete(id)

        await Post.updateMany(
            { comments: id },
            { $pull: { comments: id } }
        )

        res.json(deletedComment)
    } catch (error) {
        console.log(error)
        res.json({ message: "Ошибка удаления комментария" })
    }
}