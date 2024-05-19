import * as fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import * as handlebars from 'handlebars'
import { Injectable } from '@nestjs/common'

import { createPdf } from '../utils'
import { IPdfService } from '../interfaces/pdf.service.interface'

const readFileAsync = promisify(fs.readFile)

@Injectable()
export class PdfService implements IPdfService {
  constructor() {}

  async generatePdf(templateName: string, data?: any): Promise<Buffer> {
    const templatePath = join(process.cwd(), 'views', `${templateName}.hbs`)
    const templateHtml = await readFileAsync(templatePath, 'utf-8')

    const compiledTemplate = handlebars.compile(templateHtml)
    const htmlContent = compiledTemplate(data)

    return await createPdf(htmlContent, { printBackground: true, margin: { bottom: 60 } })
  }
}
