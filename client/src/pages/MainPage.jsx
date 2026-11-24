import React, { useEffect } from 'react'
import { PostItem } from '../components/PostItem'
import PopularPosts from '../components/PopularPosts'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../redux/features/post/postSlice'
import { checkIsAuth } from '../redux/features/auth/authSlice'

export const MainPage = () => {
    const dispatch = useDispatch()
    const { posts, popularPosts } = useSelector((state) => state.post)
    const isAuth = useSelector(checkIsAuth)
    const currentUsername = useSelector(state => state.auth.user?.username)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    if (!posts.length) {
        return (
            <div className='empty-state'>
                <h2>No stories yet</h2>
                <p>Be the first to share something worth reading.</p>
            </div>
        )
    }

    return (
        <main className='page-container'>
            <section className='page-hero'>
                <p className='eyebrow'>A quiet place for good ideas</p>
                <h1 className='page-title'>Stories with a point of view.</h1>
                <p className='page-lede'>Thoughtful writing from curious people. Read something new, then add your own perspective.</p>
            </section>
            <div className='feed-layout'>
                <div className='post-feed'>
                    {posts?.map((post, idx) => (
                        <PostItem key={idx} post={post} currentUserUsername={currentUsername} />
                    ))}
                </div>

                <aside className='sidebar'>
                    <h2 className='sidebar-title'>Popular this week</h2>
                    <div className='popular-list'>
                        {popularPosts?.map((post, idx) => (
                            <PopularPosts key={idx} post={post} />
                        ))}
                    </div>
                </aside>
            </div>
        </main>
    )
}
