import './style.css'
import { createButton } from './components/Button'
import { loadModule } from './utils/moduleLoader'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Dynamic UI Project</h1>
    <div id="buttonContainer"></div>
    <div id="moduleContainer"></div>
  </div>
`

const buttonContainer = document.querySelector<HTMLDivElement>('#buttonContainer')!
const moduleContainer = document.querySelector<HTMLDivElement>('#moduleContainer')!

const opentypeButton = createButton('Load OpenType Module', () => loadModule('opentype', moduleContainer))
const paperButton = createButton('Load Paper Module', () => loadModule('paper', moduleContainer))

buttonContainer.appendChild(opentypeButton)
buttonContainer.appendChild(paperButton)