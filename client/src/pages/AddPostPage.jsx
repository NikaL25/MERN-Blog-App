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
    <main className="form-page">
      <form onSubmit={e => e.preventDefault()} className="form-card">
        <header className="form-header">
          <p className="eyebrow">New publication</p>
          <h1 className="form-title">Share an idea.</h1>
          <p className="form-copy">Give your readers something thoughtful to take with them.</p>
        </header>

        <div className="form-stack">
          <label className="upload-zone">
            <span>{image ? 'Change cover image' : 'Choose a cover image'}</span>
            <input type="file" className="hidden" onChange={e => setImage(e.target.files[0])} />
          </label>

          {image && (
            <img src={URL.createObjectURL(image)} alt={image.name} className="upload-preview" />
          )}

          <label className="field">
            Story title
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="A title people will remember" />
          </label>

          <label className="field">
            Story body
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Start writing..." />
          </label>

          <div className="form-actions">
            <button type="button" onClick={clearFormHandler} className="button-secondary">Clear</button>
            <button type="button" onClick={submitHandler} className="button-primary">Publish story</button>
          </div>
        </div>
      </form>
    </main>
  )
}
