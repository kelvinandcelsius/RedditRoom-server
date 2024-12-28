import axios from 'axios'
import { Sorting, Post } from '../types/reddit.types'

export const fetchRedditPosts = async (subreddit: string, sorting: Sorting): Promise<Post[]> => {

    try {
        const url = `https://www.reddit.com/r/${subreddit}/${sorting}.json?limit=10`

        const response = await axios.get(url)

        if (response.data.kind !== 'Listing' || !response.data.data.children.length) {
            throw { status: 404, message: `Subreddit '${subreddit}' not found` }
        }

        return response.data.data.children.map((post: any) => ({
            title: post.data.title,
            upvotes: post.data.ups,
            comments: post.data.num_comments,
            date: new Date(post.data.created_utc * 1000),
        }))

    } catch (error: any) {
        if (error.response?.status === 404) {
            console.error(`Subreddit '${subreddit}' not found`)
            throw { status: 404, message: `Subreddit '${subreddit}' not found` }
        }
        console.error('Error fetching Reddit posts:', error)
        throw new Error('Error fetching Reddit posts')
    }
}
