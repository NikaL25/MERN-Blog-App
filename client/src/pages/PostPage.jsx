import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'
import dayjs from 'dayjs'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from '../utils/axios'
import { removePost } from '../redux/features/post/postSlice'
import { createComment, getPostComments, updateComment, deleteComment } from '../redux/features/comment/commentSlice'
import { CommentItem } from '../components/CommentItem'
import { getImageUrl } from '../utils/imageUrl'

export const PostPage = () => {
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')
    const [editId, setEditId] = useState(null)
    const { user } = useSelector((state) => state.auth)
    const { comments } = useSelector((state) => state.comment)
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    const handleEdit = (cmt) => {
        setComment(cmt.comment)
        setEditId(cmt._id)
    }

    const handleDelete = (id) => {
        dispatch(deleteComment(id))
    }

    const removePostHandler = () => {
        try {
            dispatch(removePost(params.id))
            toast('Post has been deleted')
            navigate('/posts')
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = () => {
        try {
            if (editId) {
                dispatch(updateComment({ id: editId, comment }))
                setEditId(null)
            } else {
                const postId = params.id
                dispatch(createComment({ postId, comment }))
            }
            setComment('')
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = useCallback(async () => {
        try { dispatch(getPostComments(params.id)) } catch (error) { console.log(error) }
    }, [params.id, dispatch])

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id])

    useEffect(() => { fetchPost() }, [fetchPost])
    useEffect(() => { fetchComments() }, [fetchComments])

    if (!post) {
        return <div className='loading-state'><span className="loading-dot" />Loading story</div>
    }

    return (
        <main className="article-page page-container">
            <div className="article-shell">
                <Link className="article-back" to={'/'}>← Back to stories</Link>

                <article>
                    <header className="article-header">
                        <p className="eyebrow">Featured story</p>
                        <h1 className="article-title">{post.title}</h1>
                        <div className="article-meta">
                            <span className="post-author"><span className="avatar">{post.username?.slice(0, 2).toUpperCase()}</span>{post.username}</span>
                            <span>{dayjs(post.createdAt).format('D MMMM YYYY')}</span>
                        </div>
                    </header>

                    {post?.imgUrl && <img src={getImageUrl(post.imgUrl)} alt="Story cover" className="article-image" />}

                    <div className="article-body">
                        <p>{post.text}</p>
                    </div>

                    <div className="article-actions">
                        <div className="post-footer">
                            <span className="stat"><AiFillEye /> {post.views}</span>
                            <span className="stat"><AiOutlineMessage /> {post.comments?.length || 0}</span>
                        </div>

                        {user?._id === post.author && (
                            <div className="post-footer">
                                <Link className="icon-button" to={`/${params.id}/edit`} aria-label="Edit post"><AiTwotoneEdit /></Link>
                                <button onClick={removePostHandler} className="icon-button" aria-label="Delete post"><AiFillDelete /></button>
                            </div>
                        )}
                    </div>
                </article>

                <section className="comments-panel">
                    <h2 className="section-title">Join the conversation</h2>
                    <form className="comment-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share a thoughtful response" className="text-input" />
                        <button type="submit" onClick={handleSubmit} className="button-primary">Send</button>
                    </form>
                    <div className="comment-list">
                        {comments?.map((cmt) => <CommentItem key={cmt._id} cmt={cmt} onEdit={handleEdit} onDelete={handleDelete} />)}
                    </div>
                </section>
            </div>
        </main>
    )
}
