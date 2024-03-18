export interface IPdfService {
  generatePdf(templateName: string, output: string, data?: any): Promise<void>
}
