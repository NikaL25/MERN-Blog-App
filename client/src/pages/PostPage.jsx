import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    AiFillEye,
    AiOutlineMessage,
    AiTwotoneEdit,
    AiFillDelete,
} from 'react-icons/ai'
import dayjs from 'dayjs'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from '../utils/axios'
import { removePost } from '../redux/features/post/postSlice'
import {
    createComment,
    getPostComments,
} from '../redux/features/comment/commentSlice'
import { CommentItem } from '../components/CommentItem'
import { updateComment, deleteComment } from '../redux/features/comment/commentSlice'

const API_URL = "https://mern-blog-app-0lw2.onrender.com"

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
            toast('Пост был удален')
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
        try {
            dispatch(getPostComments(params.id))
        } catch (error) {
            console.log(error)
        }
    }, [params.id, dispatch])

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    if (!post) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Loading..
            </div>
        )
    }
    return (
        <div>
            <button className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
                <Link className='flex' to={'/'}>
                    Назад
                </Link>
            </button>

            <div className='flex gap-10 py-8'>
                <div className='w-2/3'>
                   <div className='flex flex-col basis-1/4 flex-grow'>
  <div
    className={
      post?.imgUrl
        ? 'flex rounded-sm overflow-hidden shadow-md h-96 mb-4' 
        : 'flex rounded-sm'
    }
  >
    {post?.imgUrl && (
  {/* src={`http://localhost:3002/${post.imgUrl}`} */}
<img
  src={`${API_URL}/${post.imgUrl}`}
  alt="img"
  className="object-cover w-full h-full rounded-sm"
/>
    )}
  </div>
</div>

                    <div className='flex justify-between items-center pt-2'>
                        <div className='text-xs text-white opacity-50'>
                            {post.username}
                        </div>
                        <div className='text-xs text-white opacity-50'>
                             <div className='text-xs text-white opacity-50'>{dayjs(post.createdAt).format('D MMMM YYYY')}</div>
                        </div>
                    </div>
                    <div className='text-white text-xl'>{post.title}</div>
                    <p className='text-white opacity-60 text-xs pt-4'>
                        {post.text}
                    </p>

                    <div className='flex gap-3 items-center mt-2 justify-between'>
                        <div className='flex gap-3 mt-4'>
                            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                                <AiFillEye /> <span>{post.views}</span>
                            </button>
                            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                                <AiOutlineMessage />{' '}
                                <span>{post.comments?.length || 0} </span>
                            </button>
                        </div>

                        {user?._id === post.author && (
                            <div className='flex gap-3 mt-4'>
                                <button className='flex items-center justify-center gap-2 text-white opacity-50'>
                                    <Link to={`/${params.id}/edit`}>
                                        <AiTwotoneEdit />
                                    </Link>
                                </button>
                                <button
                                    onClick={removePostHandler}
                                    className='flex items-center justify-center gap-2  text-white opacity-50'
                                >
                                    <AiFillDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
               <div className="w-1/3 p-6 bg-gray-700 flex flex-col gap-4 rounded-xl shadow-md">
  <form
    className="flex gap-2"
    onSubmit={(e) => e.preventDefault()}
  >
    <input
      type="text"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Comment"
      className="flex-1 px-3 py-2 rounded-lg text-black bg-gray-300 placeholder-gray-700 outline-none text-sm"
    />
    <button
      type="submit"
      onClick={handleSubmit}
      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm"
    >
      Send
    </button>
  </form>

  <div className="flex flex-col gap-3 mt-2">
    {comments?.map((cmt) => (
      <CommentItem
        key={cmt._id}
        cmt={cmt}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ))}
  </div>
</div>
            </div>
        </div>
    )
}
