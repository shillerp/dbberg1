import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chat';
import { rateLimitMiddleware } from './middleware/rateLimit';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// CORS configuration - allow requests from static HTML pages
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5500', // Live Server default
    'http://127.0.0.1:5500',
    'http://localhost:8080',
    // Add production domain when deployed
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
}));

// Apply rate limiting to API routes
app.use('/api', rateLimitMiddleware);

// Routes
app.use('/api', chatRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
  console.log(`OpenAI configured: ${!!process.env.OPENAI_API_KEY}`);
});

export default app;
