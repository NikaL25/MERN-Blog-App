import React from 'react'
import { Link } from 'react-router-dom'
const PopularPosts = ({post}) => {
  return (
        <Link to={`${post._id}`} className="popular-item">
            <span className="popular-index">FEATURED STORY</span>
            {post.title} 
         </Link>
  )
}

export default PopularPosts
