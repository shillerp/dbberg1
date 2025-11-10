import OpenAI from 'openai';
import { ChatMessage, CHAT_CONSTRAINTS } from '../types/chat';

/**
 * OpenAI service for chat completions
 */
export class OpenAIService {
  private client: OpenAI | null = null;
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    
    if (this.apiKey) {
      this.client = new OpenAI({
        apiKey: this.apiKey,
      });
    }
  }

  /**
   * Check if OpenAI is configured
   */
  isConfigured(): boolean {
    return !!this.client;
  }

  /**
   * Generate chat completion
   * TODO: Add streaming support for better UX
   */
  async generateChatCompletion(
    messages: ChatMessage[],
    model: string = CHAT_CONSTRAINTS.DEFAULT_MODEL
  ): Promise<string> {
    if (!this.client) {
      // Return placeholder response if API key is not configured
      return 'OpenAI API key is not configured. Please set OPENAI_API_KEY environment variable.';
    }

    try {
      const completion = await this.client.chat.completions.create({
        model,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        max_tokens: 1000,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || 'No response generated.';
    } catch (error) {
      console.error('OpenAI API error:', error);
      
      if (error instanceof Error) {
        throw new Error(`Failed to generate response: ${error.message}`);
      }
      
      throw new Error('Failed to generate response from OpenAI');
    }
  }
}

// Singleton instance
export const openaiService = new OpenAIService();
