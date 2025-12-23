# dbberg - Open Source Database Aggregator

A website for aggregating and providing information about open-source databases, now featuring an AI-powered chatbot assistant.

## Features

- 📚 Static HTML pages with information about open-source databases
- 🤖 AI-powered chatbot for answering questions
- 💬 Real-time chat interface with OpenAI integration
- 🔒 Rate limiting and security features
- 📱 Mobile-responsive chat widget

---

## AI Chatbot

The AI chatbot provides an interactive way for users to get information about databases and other topics. The chatbot is implemented as a React widget that can be embedded in any HTML page.

### Architecture

The chatbot consists of two main components:

1. **Frontend (Client)**: React-based chat widget built with Vite
2. **Backend (Server)**: Node.js/Express API server with OpenAI integration

### Installation

#### Prerequisites

- Node.js 18+ and npm
- OpenAI API key (get one at https://platform.openai.com)

#### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/shillerp/dbberg1.git
   cd dbberg1
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Development

#### Running the Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:3001` with hot-reloading enabled.

#### Running the Client

```bash
cd client
npm run dev
```

The client development server will start on `http://localhost:3000`.

#### Development Testing

Open `http://localhost:3000` to see the chat widget in action on the development page.

### Building for Production

#### Build the Server

```bash
cd server
npm run build
npm start
```

#### Build the Client

```bash
cd client
npm run build
```

The production-ready bundle will be created in `client/dist/`:
- `chat-widget.umd.cjs` - Main JavaScript bundle
- `style.css` - Styles for the widget

### Integration into HTML Pages

To add the chat widget to existing HTML pages (e.g., Home.html, About.html):

1. **Build the client** (see above)

2. **Copy the built files** to your web server's assets directory:
   ```bash
   cp client/dist/chat-widget.umd.cjs /path/to/your/webroot/assets/
   cp client/dist/style.css /path/to/your/webroot/assets/
   ```

3. **Add the script and styles** to your HTML page before the closing `</body>` tag:
   ```html
   <link rel="stylesheet" href="/assets/style.css">
   <div id="chat-root"></div>
   <script src="/assets/chat-widget.umd.cjs"></script>
   ```

   Or serve directly from the client/dist directory:
   ```html
   <link rel="stylesheet" href="client/dist/style.css">
   <div id="chat-root"></div>
   <script src="client/dist/chat-widget.umd.cjs"></script>
   ```

4. **Ensure the backend server is running** and accessible from your frontend.

### API Endpoints

#### POST /api/chat

Send a message to the AI chatbot.

**Request:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "What is PostgreSQL?"
    }
  ],
  "model": "gpt-3.5-turbo"
}
```

**Response:**
```json
{
  "message": "PostgreSQL is a powerful, open-source relational database...",
  "model": "gpt-3.5-turbo"
}
```

**Error Response:**
```json
{
  "error": "Error message here"
}
```

#### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Configuration

Environment variables (`.env` file):

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | (required) |
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment (development/production) | development |
| `RATE_LIMIT_PER_MIN` | Max requests per IP per minute | 10 |

### Security

- **API Key Protection**: The OpenAI API key is stored on the server and never exposed to the client
- **Rate Limiting**: Prevents abuse by limiting requests to 10 per minute per IP (configurable)
- **Input Validation**: All inputs are validated for length and content
- **CORS**: Configured to accept requests only from allowed origins
- **Environment Variables**: Use `.env` files (not committed) to store secrets

**Production Security Recommendations:**
- Use a secure secret management service (AWS Secrets Manager, Azure Key Vault, etc.)
- Enable HTTPS for all API communications
- Implement user authentication (OAuth integration - see issue #1)
- Add request logging and monitoring
- Regularly update dependencies
- Consider implementing additional rate limiting at the infrastructure level

### Testing

#### Run Server Tests

```bash
cd server
npm test
```

#### Run Linting

```bash
# Server
cd server
npm run lint

# Client
cd client
npm run lint
```

### Future Enhancements

The codebase includes placeholders for future features:

1. **Streaming Responses** (TODO in `server/src/services/openai.ts`)
   - Enable real-time token streaming for better UX

2. **RAG (Retrieval Augmented Generation)** (TODO in `server/retrieval/embeddings.ts`)
   - Ingest website content
   - Generate embeddings
   - Provide context-aware responses based on site content

3. **OAuth Integration** (TODO in `client/src/components/ChatWidget.tsx`)
   - User authentication
   - Session management
   - Personalized experiences

### Troubleshooting

**Chat widget doesn't appear:**
- Check browser console for errors
- Ensure the `chat-root` div exists
- Verify JavaScript files are loaded correctly
- Check CORS settings if serving from different domains

**API requests fail:**
- Ensure the server is running (`npm run dev` in server directory)
- Check that `OPENAI_API_KEY` is set in `.env`
- Verify the API URL in `client/src/types/chat.ts` matches your server
- Check browser console for network errors

**Rate limiting errors:**
- Wait 60 seconds and try again
- Adjust `RATE_LIMIT_PER_MIN` in `.env` if needed for development

**OpenAI API errors:**
- Verify your API key is valid and has credits
- Check OpenAI service status
- Review server logs for detailed error messages

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### License

MIT

---

## Project Structure

```
dbberg1/
├── client/                 # React chat widget (frontend)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── types/         # TypeScript type definitions
│   │   ├── styles/        # CSS styles
│   │   └── index.tsx      # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                 # Express API server (backend)
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   ├── services/      # Business logic
│   │   ├── types/         # TypeScript type definitions
│   │   └── index.ts       # Server entry point
│   ├── retrieval/         # Future RAG implementation
│   ├── __tests__/         # Jest tests
│   ├── package.json
│   └── tsconfig.json
│
├── *.html                  # Static website pages
├── *.css                   # Static website styles
├── images/                 # Website images
├── scripts/                # PHP form processors
├── .env.example           # Environment variables template
├── .gitignore
└── README.md              # This file
```