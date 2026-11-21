import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createPost, getAll, getById,getMyPosts,updatePost, removePost, getPostComments } from "../controllers/posts.js";

const router = new Router()


// Register
// http://localhost:3002/api/posts
router.post("/", checkAuth, createPost)


// Get All Posts
// http://localhost:3002/api/posts
router.get("/", getAll)


// Get My Posts
// http://localhost:3002/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts)

// Get Post By Id
// http://localhost:3002/api/posts/:id
router.get('/:id', getById)

// Update Post
// http://localhost:3002/api/posts/:id
router.put('/:id', checkAuth, updatePost)

// Remove Post
// http://localhost:3002/api/posts/user/me
router.delete('/:id', checkAuth, removePost)


// Get Post Comments
// http://localhost:3002/api/posts/comments/:id
router.get('/comments/:id', getPostComments)

export default router
