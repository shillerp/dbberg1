import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const RATE_LIMIT_PER_MIN = parseInt(process.env.RATE_LIMIT_PER_MIN || '10', 10);

/**
 * In-memory rate limiter
 * Limits requests per IP address
 */
const rateLimiter = new RateLimiterMemory({
  points: RATE_LIMIT_PER_MIN, // Number of requests
  duration: 60, // Per 60 seconds (1 minute)
});

/**
 * Rate limiting middleware
 * Returns 429 Too Many Requests if limit exceeded
 */
export const rateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    await rateLimiter.consume(ip);
    next();
  } catch (error) {
    res.status(429).json({
      error: 'Too many requests. Please try again later.',
      retryAfter: 60
    });
  }
};
