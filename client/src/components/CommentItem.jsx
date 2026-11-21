import React from 'react'
import { useSelector } from 'react-redux'
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'

export const CommentItem = ({ cmt, onEdit, onDelete }) => {
    const { user } = useSelector(state => state.auth)

    const isAuth = !!user

    const isOwner =
        user &&
        (cmt.author?._id === user._id || cmt.author === user._id)

    const avatar = cmt.author?.username
        ? cmt.author.username.slice(0, 2).toUpperCase()
        : '??'

    return (
        <div className='comment'>
            <div className='avatar'>
                    {avatar}
            </div>

            <div className='comment-content'>
                <div className='comment-author'>
                    {cmt.author?.username || 'Anonymous'}
                </div>
                <div className='comment-text'>
                    {cmt.comment}
                </div>

            {isAuth && (
                <div className='comment-actions'>
                    
                    {isOwner && (
                        <button onClick={() => onEdit(cmt)}>
                            <AiTwotoneEdit />
                        </button>
                    )}

                    {isOwner && (
                        <button onClick={() => onDelete(cmt._id)}>
                            <AiFillDelete />
                        </button>
                    )}

                </div>
            )}
            </div>
        </div>
    )
}
