import { Request, Response } from 'express'
import { fetchRedditPosts } from '../services/reddit-services'
import { analyzeSentiment } from '../services/openai-services'
import { Sorting } from '../types/reddit.types'

const fetchPosts = async (req: Request, res: Response) => {

    const subreddit = req.query.subreddit as string
    const sorting = req.query.sorting as Sorting

    try {
        const posts = await fetchRedditPosts(subreddit, sorting)

        const postsWithSentiment = await Promise.all(posts.map(async (post) => {
            const { sentiment, fallback, message } = await analyzeSentiment(post.title)
            return {
                ...post,
                sentiment,
                sentimentFallback: fallback,
                sentimentMessage: message
            }
        }))

        res.json(postsWithSentiment)

    } catch (error: any) {
        const status = error.status || 500
        res.status(status).json({ error: error.message })
    }
}

export { fetchPosts }
