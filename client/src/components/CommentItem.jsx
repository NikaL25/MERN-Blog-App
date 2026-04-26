import React from 'react'
import { useSelector } from 'react-redux'
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'

export const CommentItem = ({ cmt, onEdit, onDelete }) => {
    const { user } = useSelector(state => state.auth)

    // Проверка: залогинен ли пользователь
    const isAuth = !!user

    // Проверка: это наш комментарий (работает и со строкой и с объектом)
    const isOwner =
        user &&
        (cmt.author?._id === user._id || cmt.author === user._id)

    // Аватар (первые 2 буквы username)
    const avatar = cmt.author?.username
        ? cmt.author.username.slice(0, 2).toUpperCase()
        : '??'

    return (
        <div className='flex flex-col gap-1 border-b border-gray-600 pb-2'>
            <div className='flex items-center gap-3'>
                <div className='flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm'>
                    {avatar}
                </div>

                <div className='text-gray-300 text-[12px]'>
                    {cmt.comment}
                </div>
            </div>

            {/* показываем кнопки ТОЛЬКО если пользователь залогинен */}
            {isAuth && (
                <div className='flex justify-end gap-3 text-white opacity-50 text-sm'>
                    
                    {/* редактировать можно только свой */}
                    {isOwner && (
                        <button onClick={() => onEdit(cmt)}>
                            <AiTwotoneEdit />
                        </button>
                    )}

                    {/* удалять можно только свой */}
                    {isOwner && (
                        <button onClick={() => onDelete(cmt._id)}>
                            <AiFillDelete />
                        </button>
                    )}

                </div>
            )}
        </div>
    )
}