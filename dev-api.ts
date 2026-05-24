import http from 'http'
import handler from './api/mcp.js'

const PORT = 3001

http.createServer(async (req, res) => {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString()
  ;(req as any).body = raw ? JSON.parse(raw) : undefined
  await handler(req as any, res as any)
}).listen(PORT, () => {
  console.log(`MCP API running on http://localhost:${PORT}`)
})
