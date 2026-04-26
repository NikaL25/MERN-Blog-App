import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPost } from '../redux/features/post/postSlice'
import { useNavigate } from 'react-router-dom'

export const AddPostPage = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = () => {
    try {
      const data = new FormData()
      data.append('title', title)
      data.append('text', text)
      data.append('image', image)
      dispatch(createPost(data))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const clearFormHandler = () => {
    setText('')
    setTitle('')
    setImage('')
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <form
        onSubmit={e => e.preventDefault()}
        className="w-full max-w-lg bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col gap-6 mx-auto"
      >
        {/* Image Upload */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg py-4 cursor-pointer text-gray-300 hover:border-indigo-500 transition-colors">
          Add Image
          <input
            type="file"
            className="hidden"
            onChange={e => setImage(e.target.files[0])}
          />
        </label>

        {image && (
          <div className="w-full h-64 flex justify-center items-center overflow-hidden rounded-lg">
            <img
              src={URL.createObjectURL(image)}
              alt={image.name}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* Title */}
        <label className="flex flex-col text-gray-300 text-sm">
          Post Title
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            className="mt-1 px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-gray-400"
          />
        </label>

        {/* Text */}
        <label className="flex flex-col text-gray-300 text-sm">
          Post Text
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Post text"
            className="mt-1 px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none h-40 placeholder-gray-400"
          />
        </label>

        {/* Buttons */}
        <div className="flex gap-4 justify-center mt-2">
          <button
            onClick={submitHandler}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Add Post
          </button>

          <button
            onClick={clearFormHandler}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}