import { saveAs } from './saveAs'

export const DEFAULT_WIDTH = 1920
export const DEFAULT_HEIGHT = 1080

export function downloadSvg(svgMarkup: string, name = 'scaletive-bg') {
  const blob = new Blob([svgMarkup], { type: 'image/svg+xml' })
  saveAs(blob, `${name}.svg`)
}

export async function downloadPng(svgMarkup: string, name = 'scaletive-bg', width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) {
  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgMarkup)}`
  const image = new Image()
  image.crossOrigin = 'anonymous'

  const imageLoad = new Promise<HTMLImageElement>((resolve, reject) => {
    image.onload = () => resolve(image)
    image.onerror = (err) => reject(err)
  })

  image.src = url
  await imageLoad

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Canvas not supported')
  }

  ctx.fillStyle = '#0f1115'
  ctx.fillRect(0, 0, width, height)
  ctx.drawImage(image, 0, 0, width, height)

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (!result) {
        reject(new Error('PNG export failed'))
        return
      }
      resolve(result)
    })
  })

  saveAs(blob, `${name}.png`)
}

export async function copySvg(svgMarkup: string) {
  const type = 'image/svg+xml'
  const blob = new Blob([svgMarkup], { type })
  if (navigator.clipboard && (navigator.clipboard as any).write) {
    const data = [new ClipboardItem({ [type]: blob })]
    await (navigator.clipboard as any).write(data)
    return
  }

  const text = await blob.text()
  await navigator.clipboard.writeText(text)
}
