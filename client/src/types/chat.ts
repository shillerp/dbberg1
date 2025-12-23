/**
 * Chat message role types
 * Must match server-side types
 */
export type MessageRole = 'user' | 'assistant' | 'system';

/**
 * Individual chat message
 */
export interface ChatMessage {
  role: MessageRole;
  content: string;
}

/**
 * Request body for chat endpoint
 */
export interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
}

/**
 * Response from chat endpoint
 */
export interface ChatResponse {
  message: string;
  model?: string;
  error?: string;
}

/**
 * Chat API configuration
 */
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001',
  CHAT_ENDPOINT: '/api/chat',
};
