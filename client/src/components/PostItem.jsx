import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { getImageUrl } from '../utils/imageUrl'

export const PostItem = ({ post }) => {
if (!post || !post._id) {
  return (
    <div className="empty-state">
      Post does not exists
    </div>
  )
}

  return (
    <Link
      to={`/${post._id}`}
      className="post-card"
    >
        {post.imgUrl && (
        <img
          src={getImageUrl(post.imgUrl)}
          alt="img-1"
          className="post-image"
        />
      )}

      <div className="post-card-content">
        <div className="post-meta">
          <span className="post-author"><span className="avatar">{post.username?.slice(0, 2).toUpperCase()}</span>{post.username}</span>
          <span>{dayjs(post.createdAt).format('D MMMM YYYY')}</span>
        </div>

        <h2 className="post-title line-clamp-2">
          {post.title}
        </h2>

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
    </Link>
  )
}
