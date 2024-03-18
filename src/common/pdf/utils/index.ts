import * as puppeteer from 'puppeteer'
import { PDF_FONT_FAMILY } from '../constants/pdf.enum.constant'

export const createPdf = async (htmlContent: any, output: string, options?: puppeteer.PDFOptions) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--font-render-hinting=medium'],
    defaultViewport: { width: 1920, height: 1080 },
  })
  const page = await browser.newPage()

  await page.evaluate((fontPaths: { src: string; weight: string }[]) => {
    fontPaths.forEach(fontPath => {
      const font = new FontFace('YekanBakh', `url('${fontPath.src}')`, { weight: fontPath.weight })
      document.fonts.add(font)
    })
  }, PDF_FONT_FAMILY)

  await page.setContent(htmlContent)
  const pdfOptions: puppeteer.PDFOptions = { format: 'A4', path: output, ...options }

  await page.pdf(pdfOptions)
  await browser.close()
}
