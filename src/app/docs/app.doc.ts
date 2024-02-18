import { applyDecorators } from '@nestjs/common'
import { AppHelloSerialization } from 'src/app/serializations/app.hello.serialization'
import { Doc, DocResponse } from 'src/common/doc/decorators/doc.decorator'

export function AppHelloDoc(): MethodDecorator {
  return applyDecorators(
    Doc({ summary: 'Hello Test API' }),
    DocResponse<AppHelloSerialization>('app.hello', {
      serialization: AppHelloSerialization,
    })
  )
}
