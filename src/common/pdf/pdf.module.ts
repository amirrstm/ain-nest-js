import { Global, Module } from '@nestjs/common'

import { PdfService } from './services/pdf.service'

@Global()
@Module({
  imports: [],
  controllers: [],
  exports: [PdfService],
  providers: [PdfService],
})
export class PdfModule {}
