import { Router, Request, Response } from 'express';
import { openaiService } from '../services/openai';
import { ChatRequest, ChatResponse, CHAT_CONSTRAINTS } from '../types/chat';

const router = Router();

/**
 * Validate chat request
 */
function validateChatRequest(body: unknown): { valid: boolean; error?: string } {
  if (!body.messages || !Array.isArray(body.messages)) {
    return { valid: false, error: 'Messages array is required' };
  }

  if (body.messages.length === 0) {
    return { valid: false, error: 'At least one message is required' };
  }

  if (body.messages.length > CHAT_CONSTRAINTS.MAX_MESSAGES) {
    return { 
      valid: false, 
      error: `Too many messages. Maximum ${CHAT_CONSTRAINTS.MAX_MESSAGES} allowed` 
    };
  }

  for (const msg of body.messages) {
    if (!msg.role || !msg.content) {
      return { valid: false, error: 'Each message must have role and content' };
    }

    if (!['user', 'assistant', 'system'].includes(msg.role)) {
      return { valid: false, error: 'Invalid message role' };
    }

    if (msg.content.length > CHAT_CONSTRAINTS.MAX_MESSAGE_LENGTH) {
      return { 
        valid: false, 
        error: `Message content too long. Maximum ${CHAT_CONSTRAINTS.MAX_MESSAGE_LENGTH} characters` 
      };
    }
  }

  return { valid: true };
}

/**
 * POST /api/chat
 * Main chat endpoint
 */
router.post('/chat', async (req: Request, res: Response) => {
  try {
    const validation = validateChatRequest(req.body);
    
    if (!validation.valid) {
      return res.status(400).json({
        error: validation.error
      } as ChatResponse);
    }

    const { messages, model } = req.body as ChatRequest;

    // Generate response from OpenAI
    const responseMessage = await openaiService.generateChatCompletion(
      messages,
      model
    );

    const response: ChatResponse = {
      message: responseMessage,
      model: model || CHAT_CONSTRAINTS.DEFAULT_MODEL
    };

    res.json(response);
  } catch (error) {
    console.error('Chat endpoint error:', error);
    
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error'
    } as ChatResponse);
  }
});

export default router;
