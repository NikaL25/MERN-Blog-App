import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    comments: [],
    loading: false,
}

export const createComment = createAsyncThunk(
    'comment/createComment',
    async ({ postId, comment }) => {
        try {
            const { data } = await axios.post(`/comments/${postId}`, {
                postId,
                comment,
            })
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const getPostComments = createAsyncThunk(
    'comment/getPostComments',
    async (postId) => {
        try {
            const { data } = await axios.get(`/posts/comments/${postId}`)
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

// Update Comment
export const updateComment = createAsyncThunk(
    'comment/updateComment',
    async ({ id, comment }) => {
        try {
            const { data } = await axios.put(`/comments/${id}`, { comment })
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

// Delete Comment
export const deleteComment = createAsyncThunk(
    'comment/deleteComment',
    async (id) => {
        try {
            const { data } = await axios.delete(`/comments/${id}`)
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const commentSlice= createSlice({
    name: 'comment',
    initialState,
    reducers: {} , 
    extraReducers: (builder) => {
        // Create Comment
         builder
              .addCase(createComment.pending, (state) =>{
                      state.loading = true
              })
              .addCase(createComment.fulfilled, (state, action) =>{
                      state.loading = false
                      state.comments.push(action.payload)
              })
              .addCase(createComment.rejected, (state) =>{
                      state.loading = false
              })

         // Get Comments
             .addCase(getPostComments.pending, (state) =>{
                      state.loading = true
              })
             .addCase(getPostComments.fulfilled, (state, action) =>{
                        state.loading = false
                        state.comments = Array.isArray(action.payload) ? action.payload : []
                        })
                    .addCase(getPostComments.rejected, (state) =>{
                      state.loading = false
              })

              .addCase(updateComment.fulfilled, (state, action) => {
                    const index = state.comments.findIndex(c => c._id === action.payload._id)
                    if (index >= 0) state.comments[index] = action.payload
               })
              .addCase(deleteComment.fulfilled, (state, action) => {
                    state.comments = state.comments.filter(c => c._id !== action.payload._id)
                })
                    }
                })



export default commentSlice.reducer