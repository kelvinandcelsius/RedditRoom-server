import axios from 'axios'
import { Sentiment } from '../types/reddit.types'
import { generateRandomSentiment } from '../helpers/generateRandomSentiment'

export const analyzeSentiment = async (text: string): Promise<{ sentiment: Sentiment, fallback: boolean, message?: string }> => {

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a sentiment analysis assistant. You analyze the sentiment of text and assign a sentiment score.',
                    },
                    {
                        role: 'user',
                        content: `Analyze the sentiment of the following text: "${text}". Output as "Positive", "Neutral", or "Negative".`,
                    },
                ],
                max_tokens: 10,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        )

        const sentiment = response.data.choices[0].message.content.trim() as Sentiment

        if (['Positive', 'Neutral', 'Negative'].includes(sentiment)) {
            return { sentiment, fallback: false }
        } else {
            throw new Error('Unexpected sentiment value')
        }

    } catch (error: any) {

        const isQuotaError = error.response?.data?.error?.type === 'insufficient_quota'

        if (isQuotaError) {
            const fallbackSentiment = generateRandomSentiment()
            console.error('Error analyzing sentiment:', {
                message: error.message,
                code: error.code,
                response: error.response?.data,
                status: error.response?.status,
            })
            return {
                sentiment: fallbackSentiment,
                fallback: true,
                message: 'OpenAI API quota exceeded. Sentiment is randomly generated.',
            }
        }

        console.error('Error analyzing sentiment:', {
            message: error.message,
            code: error.code,
            response: error.response?.data,
            status: error.response?.status,
        })

        throw new Error('Error analyzing sentiment')
    }
}