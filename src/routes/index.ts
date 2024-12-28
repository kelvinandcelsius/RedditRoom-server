import express, { Router } from 'express'
import redditRoutes from './reddit.routes'

const router: Router = express.Router()

router.use("/reddit", redditRoutes)

export default router