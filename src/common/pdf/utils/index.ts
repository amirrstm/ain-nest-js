import * as puppeteer from 'puppeteer'
import { PDF_FONT_FAMILY } from '../constants/pdf.enum.constant'

export const createPdf = async (htmlContent: any, options?: puppeteer.PDFOptions): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--font-render-hinting=medium', '--disable-web-security'],
  })
  const page = await browser.newPage()

  await page.evaluate((fontPaths: { src: string; weight: string; name: string }[]) => {
    fontPaths.forEach(fontPath => {
      const font = new FontFace(fontPath.name, `url(${fontPath.src})`, { weight: fontPath.weight })
      document.fonts.add(font)
    })
  }, PDF_FONT_FAMILY)
  await page.waitForFunction('document.fonts.ready')

  await page.setContent(htmlContent)
  const pdfOptions: puppeteer.PDFOptions = { format: 'A4', ...options }

  const pdfBuffer = await page.pdf(pdfOptions)
  await browser.close()

  return pdfBuffer
}
