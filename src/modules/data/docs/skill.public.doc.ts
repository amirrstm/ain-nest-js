import { applyDecorators } from '@nestjs/common'

import { Doc, DocResponsePaging } from 'src/common/doc/decorators/doc.decorator'

import { SkillGetSerialization } from '../serializations/skill.get.serialization'

export function SkillsPublicListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get skills',
    }),
    DocResponsePaging<SkillGetSerialization>('data.skill.get', {
      serialization: SkillGetSerialization,
    })
  )
}
