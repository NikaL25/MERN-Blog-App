import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost } from '../redux/features/post/postSlice'
import axios from '../utils/axios'
import { getImageUrl } from '../utils/imageUrl'

export const EditPostPage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [oldImage, setOldImage] = useState('')
    const [newImage, setNewImage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setTitle(data.title)
        setText(data.text)
        setOldImage(data.imgUrl)
    }, [params.id])

    const submitHandler = async () => {
        try {
            const updatedPost = new FormData()
            updatedPost.append('title', title)
            updatedPost.append('text', text)
            updatedPost.append('id', params.id)
            if (newImage) updatedPost.append('image', newImage)
            await dispatch(updatePost(updatedPost))
            navigate('/posts')
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setTitle('')
        setText('')
    }

    useEffect(() => { fetchPost() }, [fetchPost])

    return (
        <main className="form-page">
            <form className="form-card" onSubmit={(e) => e.preventDefault()}>
                <header className="form-header">
                    <p className="eyebrow">Edit publication</p>
                    <h1 className="form-title">Refine your story.</h1>
                    <p className="form-copy">Make a thoughtful update. Your existing story stays safe until you save.</p>
                </header>

                <div className="form-stack">
                    <label className="upload-zone">
                        <span>{newImage ? 'Change cover image' : 'Replace cover image'}</span>
                        <input type="file" className="hidden" onChange={(e) => { setNewImage(e.target.files[0]); setOldImage('') }} />
                    </label>
                    <div className="form-image-row">
                        {oldImage && <img src={`${getImageUrl(oldImage)}?t=${Date.now()}`} alt="Current cover" />}
                        {newImage && <img src={URL.createObjectURL(newImage)} alt={newImage.name} />}
                    </div>

                    <label className="field">
                        Story title
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Story title" />
                    </label>

                    <label className="field">
                        Story body
                        <textarea onChange={(e) => setText(e.target.value)} value={text} placeholder="Story body" />
                    </label>

                    <div className="form-actions">
                        <button type="button" onClick={clearFormHandler} className="button-secondary">Clear</button>
                        <button type="button" onClick={submitHandler} className="button-primary">Save changes</button>
                    </div>
                </div>
            </form>
        </main>
    )
}
