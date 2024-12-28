import { Sentiment } from "../types/reddit.types"

const sentiments: Sentiment[] = ["Positive", "Neutral", "Negative"]

export const generateRandomSentiment = (): Sentiment => {
    return sentiments[Math.floor(Math.random() * sentiments.length)]
}