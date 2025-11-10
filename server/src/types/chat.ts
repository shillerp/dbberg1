/**
 * Chat message role types
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
 * Validation constraints
 */
export const CHAT_CONSTRAINTS = {
  MAX_MESSAGE_LENGTH: 4000,
  MAX_MESSAGES: 50,
  DEFAULT_MODEL: 'gpt-3.5-turbo'
};
