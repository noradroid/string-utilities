import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { z } from 'zod'
import { generatePassphrase } from '../src/features/passphrase-generator/generatePassphrase.js'
import { countTextStats } from '../src/features/text-counter/countTextStats.js'

function buildServer() {
  const server = new McpServer({ name: 'stringhetti', version: '0.0.1' })

  server.tool(
    'generate_passphrase',
    'Generate a dash-separated passphrase of random words with a minimum character length',
    {
      minChars: z.number().int().min(8).describe('Minimum character length of the passphrase'),
      includeNumbers: z.boolean().describe('Whether to include a random 2-digit number'),
    },
    async ({ minChars, includeNumbers }) => ({
      content: [{ type: 'text', text: JSON.stringify({ passphrase: generatePassphrase(minChars, includeNumbers) }) }],
    })
  )

  server.tool(
    'count_text_stats',
    'Count characters, words, and lines in a piece of text',
    {
      text: z.string().describe('The text to analyze'),
    },
    async ({ text }) => ({
      content: [{ type: 'text', text: JSON.stringify(countTextStats(text), null, 2) }],
    })
  )

  return server
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined })
  const server = buildServer()

  res.on('close', () => {
    transport.close()
    server.close()
  })

  await server.connect(transport)
  await transport.handleRequest(req, res, req.body)
}
