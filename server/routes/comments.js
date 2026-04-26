import { Router } from 'express'
const router = new Router()
import { checkAuth } from '../utils/checkAuth.js'
import { createComment,  updateComment, deleteComment, getPostComments} from '../controllers/comments.js'
//, updateComment, deleteComment, getPostComments
// Create Comment
// http://localhost:3002/api/comments/:id
router.post('/:id', checkAuth, createComment)

// Update Comment
router.put('/:id', checkAuth, updateComment)

// Delete Comment
router.delete('/:id', checkAuth, deleteComment)

router.get('/post/:id', checkAuth, getPostComments)


export default router