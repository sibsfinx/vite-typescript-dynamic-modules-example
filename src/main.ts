import './style.css'
import { createButton } from './components/Button'
import { loadModule } from './utils/moduleLoader'

// Create main container
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="test-container">
    <section class="dynamic-modules">
      <h1>Dynamic UI Project</h1>
      <div id="buttonContainer"></div>
      <div id="moduleContainer"></div>
    </section>

    <section>
      <h2>SVG Assets</h2>
      <div class="svg-test">
        <img src="/assets/PlayButton.svg" alt="Play Button" />
        <img src="/assets/watermark.svg" alt="Watermark" />
      </div>
    </section>

    <section>
      <h2>SVG Sprites</h2>
      <div class="sprite-test">
        <svg><use href="/sprites/sprite.svg#icon-play"></use></svg>
        <svg><use href="/sprites/sprite.svg#icon-pause"></use></svg>
        <svg><use href="/sprites/sprite.svg#icon-stop"></use></svg>
      </div>
    </section>

    <section>
      <h2>Lottie Animation</h2>
      <div id="lottie-container"></div>
    </section>

    <section>
      <h2>WebAssembly Test</h2>
      <div id="wasm-test">Loading WebAssembly...</div>
    </section>

    <section>
      <h2>Config Test</h2>
      <pre id="config-display"></pre>
    </section>
  </div>
`

// Set up dynamic module buttons
const buttonContainer = document.querySelector<HTMLDivElement>('#buttonContainer')!
const moduleContainer = document.querySelector<HTMLDivElement>('#moduleContainer')!

const opentypeButton = createButton('Load OpenType Module', () => loadModule('opentype', moduleContainer))
const paperButton = createButton('Load Paper Module', () => loadModule('paper', moduleContainer))

buttonContainer.appendChild(opentypeButton)
buttonContainer.appendChild(paperButton)

// Test WebAssembly loading
async function testWasm() {
  try {
    const { initWasm } = await import('/scripts/example-wasm.js')
    await initWasm() // Initialize but don't store the instance
    document.getElementById('wasm-test')!.textContent = 'WebAssembly loaded successfully!'
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    document.getElementById('wasm-test')!.textContent = `WebAssembly error: ${errorMessage}`
  }
}

// Test config loading
async function displayConfig() {
  try {
    const config = await import('/settings/dev.js')
    const configDisplay = document.getElementById('config-display')
    if (configDisplay) {
      configDisplay.textContent = JSON.stringify(config.default, null, 2)
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const configDisplay = document.getElementById('config-display')
    if (configDisplay) {
      configDisplay.textContent = `Config error: ${errorMessage}`
    }
  }
}

// Load Lottie animation
async function loadAnimation() {
  try {
    const response = await fetch('/assets/Vectary_animation_128px.json')
    await response.json() // Parse but don't store the data
    
    // You would typically use lottie-web here, but for testing we'll just show the data
    const container = document.getElementById('lottie-container')
    if (container) {
      container.textContent = 'Animation data loaded successfully!'
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const container = document.getElementById('lottie-container')
    if (container) {
      container.textContent = `Animation error: ${errorMessage}`
    }
  }
}

// Run tests
testWasm()
displayConfig()
loadAnimation()