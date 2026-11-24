import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removePost } from '../redux/features/post/postSlice'
import dayjs from 'dayjs'
import { getImageUrl } from '../utils/imageUrl'

export const PostItem = ({ post, currentUserUsername }) => {
  if (!post || !post._id) {
    return (
      <div className="empty-state">
        Post does not exists
      </div>
    )
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await dispatch(removePost(post._id))
      navigate('/posts')
    }
  }

  const handleEdit = () => {
    navigate(`/${post._id}/edit`)
  }

  return (
    <Link to={`/${post._id}`} className="post-card">
      {post.imgUrl && (
        <img
          src={getImageUrl(post.imgUrl)}
          alt="img-1"
          className="post-image"
        />
      )}

      <div className="post-card-content">
        <div className="post-meta">
          <span className="post-author">
            <span className="avatar">{post.username?.slice(0, 2).toUpperCase()}</span>{post.username}
          </span>
          <span>{dayjs(post.createdAt).format('D MMMM YYYY')}</span>
        </div>

        <h2 className="post-title line-clamp-2">{post.title}</h2>

        <p
          className="post-excerpt line-clamp-4 break-words"
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
        >
          {post.text}
        </p>

        <div className="post-footer">
          <span className="stat">
            <AiFillEye /> {post.views}
          </span>
          <span className="stat">
            <AiOutlineMessage /> {post.comments?.length || 0}
          </span>
        </div>
      </div>
      {currentUserUsername === post.username && (
        <div className="post-actions">
          <button onClick={handleEdit} className="button-primary">Edit</button>
          <button onClick={handleDelete} className="button-danger">Delete</button>
        </div>
      )}
    </Link>
  )
}