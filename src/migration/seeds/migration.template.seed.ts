import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'

import { TemplateService } from 'src/modules/template/services/template.service'
import { TemplateCreateDto } from 'src/modules/template/dtos/template.create.dto'
import { ENUM_TEMPLATE_TYPE } from 'src/modules/template/constants/template.enum.constant'

@Injectable()
export class MigrationTemplateSeed {
  constructor(private readonly templateService: TemplateService) {}

  @Command({
    command: 'seed:template',
    describe: 'seed templates',
  })
  async seeds(): Promise<void> {
    const dataAdmin: TemplateCreateDto[] = [
      {
        lang: 'fa',
        name: 'بسیک',
        path: 'templates/pdf/basic',
        image: '1d9a2b5c-ece5-4cf3-a17c-29add5518100',
        description: 'قالب بسیک',
        type: ENUM_TEMPLATE_TYPE.PDF,
        defaultSettings: {
          nameColor: '#000',
          jobTitleColor: '#0097cf',
          sectionTitleColor: '#0097cf',
          placesColor: '#0097cf',
          defaultFont: 'YekanBakh',
          roundedProfilePicture: true,
          skillBarColor: '#0097cf',
          hideInformationIcon: false,
          blockMargins: '1',
        },
      },
      {
        lang: 'fa',
        name: 'ویژن',
        description: 'قالب ویژن',
        path: 'templates/pdf/vision',
        type: ENUM_TEMPLATE_TYPE.PDF,
        image: '85ff767d-ed74-433c-8e60-2adfa2bee900',

        defaultSettings: {
          nameColor: '#000',
          jobTitleColor: '#d6974c',
          sectionTitleColor: '#d6974c',
          placesColor: '#d6974c',
          defaultFont: 'YekanBakh',
          roundedProfilePicture: true,
          skillBarColor: '#d6974c',
          hideInformationIcon: false,
          blockMargins: '1',
        },
      },
    ]

    try {
      await this.templateService.createMany(dataAdmin)
    } catch (err: any) {
      throw new Error(err.message)
    }

    return
  }

  @Command({
    command: 'remove:template',
    describe: 'remove templates',
  })
  async remove(): Promise<void> {
    try {
      await this.templateService.deleteMany({})
    } catch (err: any) {
      throw new Error(err.message)
    }

    return
  }
}
