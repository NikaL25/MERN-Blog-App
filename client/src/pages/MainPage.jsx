import React, { useEffect } from 'react'
import { PostItem } from '../components/PostItem'
import PopularPosts from '../components/PopularPosts'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../redux/features/post/postSlice'


export const MainPage = () => {
    const dispatch = useDispatch()
    const { posts, popularPosts } = useSelector((state) => state.post)

    console.log(popularPosts)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    if (!posts.length) {
        return (
            <div className='text-xl text-center text-white py-10'>
                There are no posts.
            </div>
        )
    }

    return (
      <div className='max-w-[900px] mx-auto py-10'>
<div className='flex gap-8'>
  <div className='flex flex-col gap-10 w-full max-w-[680px]'>
      {posts?.map((post, idx) => (
        <PostItem key={idx} post={post} />
      ))}
    </div>

    <div className=' min-w-[180px]'>
      <div className='text-xs uppercase text-white mb-4'>popular Posts:</div>
      {popularPosts?.map((post, idx) => (
        <PopularPosts key={idx} post={post} />
      ))}
    </div>
  </div>
</div>
    )
}
