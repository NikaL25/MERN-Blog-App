import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

export const PostItem = ({ post }) => {

if (!post || !post._id) {
  return (
    <div className="text-xl text-center text-white py-10">
      Post does not exists
    </div>
  )
}

  return (
    <Link
      to={`/${post._id}`}
      className="block w-full max-w-full transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="flex flex-col w-full max-w-full bg-gradient-to-br from-gray-600 via-gray-700  p-5 rounded-xl shadow-lg hover:shadow-2xl overflow-hidden">
        
        {post.imgUrl && (
          <img
            src={`http://localhost:3002/${post.imgUrl}`}
            alt="img"
            className="object-cover w-full h-64 sm:h-80 rounded-lg mb-4"
          />
        )}

        <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
          <span>{post.username}</span>
          <span>{dayjs(post.createdAt).format('D MMMM YYYY')}</span>
        </div>

        <h2 className="text-white text-2xl font-semibold mb-2 line-clamp-2">
          {post.title}
        </h2>

        <p
          className="text-gray-300 text-sm mb-4 line-clamp-4 break-words"
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
        >
          {post.text}
        </p>

        <div className="flex gap-4 items-center text-xs text-gray-400">
          <button className="flex items-center gap-1 hover:text-white transition-colors">
            <AiFillEye /> {post.views}
          </button>
          <button className="flex items-center gap-1 hover:text-white transition-colors">
            <AiOutlineMessage /> {post.comments?.length || 0}
          </button>
        </div>
      </div>
    </Link>
  )
}