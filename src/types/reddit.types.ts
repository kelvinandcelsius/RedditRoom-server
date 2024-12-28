export type Sorting = "best" | "hot" | "rising" | "new"

export type Sentiment = "Positive" | "Neutral" | "Negative"

export interface Post {
    title: string
    upvotes: number
    comments: number
    date: Date
    sentiment?: Sentiment
}