import OpenAI from 'openai';

/**
 * Initialize OpenAI client with API key from environment variables
 */
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for client-side usage in React
});

/**
 * Generate AI response for general assistant queries
 * @param {string} userMessage - The user's input message
 * @param {Array} conversationHistory - Previous messages for context
 * @returns {Promise<string>} The AI assistant's response
 */
export async function generateAssistantResponse(userMessage, conversationHistory = []) {
  try {
    const messages = [
      {
        role: 'system',
        content: `You are TaskMind AI, an intelligent productivity assistant. You help users with task management, productivity insights, and workflow optimization. 

Key capabilities:
- Create and organize tasks
- Analyze productivity patterns
- Suggest optimal schedules
- Provide workflow insights
- Answer questions about tasks and productivity

Keep responses helpful, concise, and focused on productivity enhancement. When suggesting tasks or schedules, provide specific, actionable recommendations.`
      },
      ...conversationHistory?.map(msg => ({
        role: msg?.type === 'user' ? 'user' : 'assistant',
        content: msg?.content
      })),
      {
        role: 'user',
        content: userMessage
      }
    ];

    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 800,
    });

    return response?.choices?.[0]?.message?.content;
  } catch (error) {
    console.error('Error generating assistant response:', error);
    throw new Error('Failed to generate AI response. Please try again.');
  }
}

/**
 * Generate structured AI insights for a specific task
 * @param {Object} task - The task object with details
 * @returns {Promise<Array>} Array of structured insights
 */
export async function generateTaskInsights(task) {
  try {
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an AI productivity expert that analyzes tasks and provides actionable insights. Generate 3-4 specific, actionable insights for the given task.

Return insights in this exact JSON format:
{
  "insights": [
    {
      "type": "suggestion|warning|optimization|reference",
      "icon": "Lightbulb|AlertTriangle|TrendingUp|BookOpen",
      "title": "Brief insight title",
      "content": "Detailed explanation of the insight",
      "action": "Actionable button text"
    }
  ]
}

Types:
- suggestion: General recommendations for improvement
- warning: Potential blockers or risks
- optimization: Productivity and efficiency tips
- reference: Related resources or similar tasks`
        },
        {
          role: 'user',
          content: `Analyze this task and provide insights:
Title: ${task?.title || 'Untitled Task'}
Description: ${task?.description || 'No description provided'}
Priority: ${task?.priority || 'medium'}
Due Date: ${task?.dueDate || 'No due date set'}
Status: ${task?.status || 'pending'}`
        }
      ],
      temperature: 0.8,
      max_tokens: 1000,
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'task_insights',
          schema: {
            type: 'object',
            properties: {
              insights: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    type: { type: 'string' },
                    icon: { type: 'string' },
                    title: { type: 'string' },
                    content: { type: 'string' },
                    action: { type: 'string' }
                  },
                  required: ['type', 'icon', 'title', 'content', 'action'],
                  additionalProperties: false
                }
              }
            },
            required: ['insights'],
            additionalProperties: false
          }
        }
      }
    });

    const result = JSON.parse(response?.choices?.[0]?.message?.content);
    return result?.insights || [];
  } catch (error) {
    console.error('Error generating task insights:', error);
    // Return fallback insights if API fails
    return [
      {
        type: 'suggestion',
        icon: 'Lightbulb',
        title: 'Break Down Complex Tasks',
        content: 'Consider breaking this task into smaller, manageable subtasks for better progress tracking.',
        action: 'Create Subtasks'
      }
    ];
  }
}

/**
 * Generate structured chat response with actionable content
 * @param {string} userMessage - The user's input message
 * @param {Array} conversationHistory - Previous messages for context
 * @returns {Promise<Object>} Response with content and actionable items
 */
export async function generateStructuredChatResponse(userMessage, conversationHistory = []) {
  try {
    const messages = [
      {
        role: 'system',
        content: `You are TaskMind AI, a productivity assistant. Generate responses with optional actionable content.

For requests about creating tasks, schedules, or organizing work, include actionable items.
For general questions or insights, provide just the content.

Return response in this JSON format:
{
  "content": "Your main response text",
  "actionableContent": null or [
    {
      "id": "unique-id",
      "title": "Actionable item title",
      "description": "Brief description",
      "dueDate": "Suggested date/time",
      "priority": "high|medium|low"
    }
  ]
}`
      },
      ...conversationHistory?.map(msg => ({
        role: msg?.type === 'user' ? 'user' : 'assistant',
        content: msg?.content
      })),
      {
        role: 'user',
        content: userMessage
      }
    ];

    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 1000,
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'chat_response',
          schema: {
            type: 'object',
            properties: {
              content: { type: 'string' },
              actionableContent: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    title: { type: 'string' },
                    description: { type: 'string' },
                    dueDate: { type: 'string' },
                    priority: { type: 'string' }
                  },
                  required: ['id', 'title', 'description'],
                  additionalProperties: false
                }
              }
            },
            required: ['content'],
            additionalProperties: false
          }
        }
      }
    });

    const result = JSON.parse(response?.choices?.[0]?.message?.content);
    return {
      content: result?.content || 'I\'m here to help with your productivity needs.',
      actionableContent: result?.actionableContent || null
    };
  } catch (error) {
    console.error('Error generating structured chat response:', error);
    // Fallback to simple response
    const fallbackResponse = await generateAssistantResponse(userMessage, conversationHistory);
    return {
      content: fallbackResponse,
      actionableContent: null
    };
  }
}

export default openai;