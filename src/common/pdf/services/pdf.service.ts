import * as fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import * as handlebars from 'handlebars'
import { Injectable } from '@nestjs/common'

import { IPdfService } from '../interfaces/pdf.service.interface'
import { PDF_OUTPUT_DIR, PDF_VIEW_DIR } from '../constants/pdf.enum.constant'
import { createPdf } from '../utils'

const readFileAsync = promisify(fs.readFile)

@Injectable()
export class PdfService implements IPdfService {
  constructor() {}

  async generatePdf(templateName: string, output: string, data?: any): Promise<void> {
    const templatePath = join(process.cwd(), PDF_VIEW_DIR, `${templateName}.hbs`)
    const templateHtml = await readFileAsync(templatePath, 'utf-8')

    const compiledTemplate = handlebars.compile(templateHtml)
    const htmlContent = compiledTemplate(data)
    const outputPath = join(process.cwd(), PDF_OUTPUT_DIR, `${output}.pdf`)

    await createPdf(htmlContent, outputPath, {
      printBackground: true,
      margin: { top: '60px', bottom: '60px' },
    })
  }
}
