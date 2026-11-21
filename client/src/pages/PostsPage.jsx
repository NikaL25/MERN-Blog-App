import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { PostItem } from '../components/PostItem'
import axios from '../utils/axios'

export const PostsPage = () => {
    const [posts, setPosts] = useState([])

    const fetchMyPosts = async () => {
        try {
            const { data } = await axios.get('/posts/user/me')
            setPosts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMyPosts()
    }, [])

    return (
        <main className='page-container'>
            <section className='page-hero'>
                <p className='eyebrow'>Your archive</p>
                <h1 className='page-title'>Your stories.</h1>
                <p className='page-lede'>Everything you have published, in one considered space.</p>
            </section>
            <div className='post-feed' style={{paddingBottom: '72px'}}>
                {posts?.map((post, idx) => (
                    <PostItem post={post} key={idx} />
                ))}
                {!posts.length && <div className='empty-state'><h2>Your archive is empty</h2><p>Publish your first story to see it here.</p></div>}
            </div>
        </main>
    )
}
