import * as opentype from 'opentype.js'

export default function(container: HTMLElement) {
  const canvas = document.createElement('canvas')
  canvas.width = 500
  canvas.height = 250
  container.appendChild(canvas)

  const ctx = canvas.getContext('2d')!
  
  const fontUrl = '/fonts/BaskervvilleSC-Regular.ttf';

  opentype.load(fontUrl, (err, font) => {
    if (err) {
      console.error('Font could not be loaded:', err)
      return
    }

    if (!font) {
      console.error('No font loaded');
      return;
    }

    const text = 'OpenType.js'
    const fontSize = 72
    const x = 10
    const y = 150

    const path = font.getPath(text, x, y, fontSize)
    path.draw(ctx)
  })
}