import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'

const TYPES = { '.html':'text/html', '.mjs':'text/javascript', '.md':'text/markdown' }

createServer(async (req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url
  try {
    const body = await readFile(join(process.cwd(), decodeURIComponent(url.split('?')[0])))
    res.writeHead(200, { 'content-type': TYPES[extname(url)] || 'application/octet-stream',
      'cross-origin-opener-policy': 'same-origin',
      'cross-origin-embedder-policy': 'require-corp',
      'cross-origin-resource-policy': 'cross-origin' })
    res.end(body)
  } catch { res.writeHead(404); res.end('not found') }
}).listen(7318, '127.0.0.1', () => console.log('open http://127.0.0.1:7318'))