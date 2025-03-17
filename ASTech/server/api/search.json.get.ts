import { serverQueryContent } from '#content/server'
import { defineEventHandler, createError, useQuery, sendError } from 'h3'
import { H3Event } from 'h3'

// Define a TypeScript interface for the content item
interface ContentItem {
  _id: string;
  _type: string;
  title: string;
  description: string;
  navigation: boolean;
}

export default defineEventHandler(async (event: H3Event) => {
  try {
    // Log the incoming request
    console.log(`Received request: ${event.req.url}`)

    // Get query parameters if any
    const query = useQuery(event)

    // Perform content query
    const content = await serverQueryContent(event)
      .where({ _type: 'markdown', navigation: { $ne: false } })
      .find<ContentItem[]>()

    if (!content || content.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'No content found', fatal: true })
    }

    // Log successful query
    console.log(`Query successful, returning ${content.length} items`)

    // Return the content
    return {
      success: true,
      data: content,
      count: content.length,
    }
  } catch (error) {
    // Log the error
    console.error('Error handling request:', error)

    // Send error response
    return sendError(event, error)
  }
})
