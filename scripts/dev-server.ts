import { createServer } from 'vite'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer as createNetServer } from 'node:net'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function findAvailablePort(startPort: number): Promise<number> {
  const isPortAvailable = (port: number): Promise<boolean> => {
    return new Promise((resolve) => {
      const server = createNetServer()
      server.once('error', () => {
        resolve(false)
      })
      server.once('listening', () => {
        server.close()
        resolve(true)
      })
      server.listen(port, '127.0.0.1')
    })
  }

  let port = startPort
  while (!(await isPortAvailable(port))) {
    port++
  }
  return port
}

async function startDevServer() {
  try {
    const port = await findAvailablePort(8000)
    
    const server = await createServer({
      // Load the project's Vite config
      configFile: path.resolve(__dirname, '../vite.config.ts'),
      
      // You can override or add config options here
      server: {
        port,
        open: true,
        host: true, // Listen on all addresses
      }
    })

    await server.listen()

    server.printUrls()
    
    // Handle shutdown gracefully
    const shutdown = async () => {
      console.log('\nShutting down dev server...')
      await server.close()
      process.exit(0)
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)

  } catch (error) {
    console.error('Failed to start dev server:', error)
    process.exit(1)
  }
}

// Start the server
startDevServer() 