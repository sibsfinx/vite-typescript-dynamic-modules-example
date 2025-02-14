import { build } from 'vite'
import * as path from 'node:path'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'
import { cp } from 'node:fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const execAsync = promisify(exec)

async function runBuild() {
  try {
    // First build TypeScript library
    console.log('Building TypeScript library...')
    const { stdout: tscOutput, stderr: tscError } = await execAsync('tsc -p tsconfig.build.json', {
      cwd: path.resolve(__dirname, '..'),
    })
    if (tscError) console.error(tscError)
    if (tscOutput) console.log(tscOutput)
    console.log('TypeScript library build complete.')

    // Then build the Vite app
    console.log('\nBuilding Vite application...')
    await build({
      // Load the project's Vite config
      configFile: path.resolve(__dirname, '../vite.config.ts'),
      
      // You can override or add config options here
      build: {
        // Additional build options if needed
        reportCompressedSize: true,
        chunkSizeWarningLimit: 1000,
      }
    })
    console.log('Vite application build complete.')

    // Copy libs to scripts in dist
    console.log('\nCopying library files to scripts directory...')
    const scriptsDir = path.resolve(__dirname, '../dist/scripts')
    await cp(
      path.resolve(__dirname, '../libs'),
      scriptsDir,
      { recursive: true }
    )
    console.log('Library files copied successfully.')

    console.log('\nBuild process completed successfully!')
  } catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
  }
}

// Run the build
runBuild() 