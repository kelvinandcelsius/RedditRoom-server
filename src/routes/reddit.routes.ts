import express from 'express'
import { fetchPosts } from '../controllers/reddit.controllers'

const router = express.Router()

router.get('/analyze', fetchPosts)

export default router
