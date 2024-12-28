<h1>
  Reddit Room
</h1>
<hr/>
Reddit Room is a *work-in-progress* full-stack MERN application contained in 2 repositories:

- [rkiveai-client](https://github.com/kelvinandcelsius/rkiveai-client): frontend
- [rkiveai-server](https://github.com/kelvinandcelsius/rkiveai-server): backend

### what is it for?

Analyzing the sentiment of Reddit posts in a given subreddit. It allows users or moderators to select a subreddit and sorting option, and display the top 10 posts of this subreddit (according to the sorting option) in a table, where they can see the posts title, number of upvotes, number of comments, date of creation, and an AI analysis* of the post's sentiment: POSITIVE, NEGATIVE or NEUTRAL.

*AI analysys is subject to sufficient quota / OpenAI tokens.
In case there is insufficient quota, a fallback mechanism randomly generates a sentiment for each post so the app doesn't crash.
The user will be informed, as a message will be rendered in the view: "OpenAI API quota exceeded. Sentiment is randomly generated."

## Installation and Setup

Clone the repository:

```bash
git clone https://github.com/kelvinandcelsius/rkiveai-server.git
cd rkiveai-server
```

Install dependencies:
```bash
npm install
```

Create a .env file based on the .env.example and configure the necessary environment variables.

Run the development server:
```bash
npm run dev
```

## Environment Configuration
Here is a template for the environment variables to be set.

**rkiveai-client**
```bash
//environment.ts
export const environment = {
    production: false,
    apiUrl: 'http://localhost:5005/api'
}
```

**rkiveai-server**
```bash
//.env
PORT=5005
ORIGIN=http://localhost:4200
OPENAI_API_KEY=your_key

```

<hr/>

## Assumptions and Limitations
- API Availability: The application assumes that the backend API is available and running at the specified URL.
- OpenAI API Quota: The sentiment analysis feature relies on the OpenAI API, which has usage limits. Exceeding the quota will result in a random value.

## Suggestions for Future Improvements

- User Authentication: Add user authentication to allow personalized settings and preferences.
- UI Enhancements: Improve the UI/UX with better styling and responsive design.
- Testing: Add unit and integration tests to improve code reliability and maintainability.