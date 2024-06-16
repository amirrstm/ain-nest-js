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
    const dataPersian: TemplateCreateDto[] = [
      {
        lang: 'fa',
        name: 'بسیک',
        path: 'templates/pdf/fa/basic',
        image: '546d07a0-ded3-4909-c31a-60cb2606da00',
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
        name: 'مدرن',
        description: 'قالب مدرن',
        path: 'templates/pdf/fa/modern',
        type: ENUM_TEMPLATE_TYPE.PDF,
        image: '33b3cee7-e78b-40fd-97ee-68432aefee00',

        defaultSettings: {
          nameColor: '#000',
          jobTitleColor: '#0097cf',
          sectionTitleColor: '#0097cf',
          placesColor: '#0097cf',
          defaultFont: 'YekanBakh',
          roundedProfilePicture: true,
          skillBarColor: '#ffffff',
          hideInformationIcon: false,
          blockMargins: '1',
        },
      },
      {
        lang: 'fa',
        name: 'ویژن',
        description: 'قالب ویژن',
        path: 'templates/pdf/fa/vision',
        type: ENUM_TEMPLATE_TYPE.PDF,
        image: '741b7a43-136b-4675-330c-22be1cf6df00',

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
      {
        lang: 'fa',
        name: 'فیوچر',
        description: 'قالب فیوچر',
        path: 'templates/pdf/fa/future',
        type: ENUM_TEMPLATE_TYPE.PDF,
        image: 'eeedf539-4134-4a9b-f4f2-bca846fd0c00',

        defaultSettings: {
          nameColor: '#000',
          jobTitleColor: '#0097cf',
          sectionTitleColor: '#000',
          placesColor: '#000',
          defaultFont: 'YekanBakh',
          roundedProfilePicture: true,
          hideInformationIcon: false,
          blockMargins: '1',
        },
      },
    ]

    const dataEnglish: TemplateCreateDto[] = [
      {
        lang: 'en',
        name: 'Basic',
        description: 'Basic template',
        type: ENUM_TEMPLATE_TYPE.PDF,
        image: '546d07a0-ded3-4909-c31a-60cb2606da00',
        path: 'templates/pdf/en/basic',
        defaultSettings: {
          nameColor: '#000',
          jobTitleColor: '#0097cf',
          sectionTitleColor: '#0097cf',
          placesColor: '#0097cf',
          defaultFont: 'Roboto',
          roundedProfilePicture: true,
          skillBarColor: '#0097cf',
          hideInformationIcon: false,
          blockMargins: '1',
        },
      },
      {
        lang: 'en',
        name: 'Modern',
        description: 'Modern template',
        type: ENUM_TEMPLATE_TYPE.PDF,
        image: '33b3cee7-e78b-40fd-97ee-68432aefee00',
        path: 'templates/pdf/en/modern',
        defaultSettings: {
          nameColor: '#000',
          jobTitleColor: '#0097cf',
          sectionTitleColor: '#0097cf',
          placesColor: '#0097cf',
          defaultFont: 'Roboto',
          roundedProfilePicture: true,
          skillBarColor: '#ffffff',
          hideInformationIcon: false,
          blockMargins: '1',
        },
      },
      {
        lang: 'en',
        name: 'Vision',
        description: 'Vision template',
        type: ENUM_TEMPLATE_TYPE.PDF,
        image: '741b7a43-136b-4675-330c-22be1cf6df00',
        path: 'templates/pdf/en/vision',
        defaultSettings: {
          nameColor: '#000',
          jobTitleColor: '#d6974c',
          sectionTitleColor: '#d6974c',
          placesColor: '#d6974c',
          defaultFont: 'Roboto',
          roundedProfilePicture: true,
          skillBarColor: '#d6974c',
          hideInformationIcon: false,
          blockMargins: '1',
        },
      },
      {
        lang: 'en',
        name: 'Future',
        description: 'Future template',
        type: ENUM_TEMPLATE_TYPE.PDF,
        image: 'eeedf539-4134-4a9b-f4f2-bca846fd0c00',
        path: 'templates/pdf/en/future',
        defaultSettings: {
          nameColor: '#000',
          jobTitleColor: '#0097cf',
          sectionTitleColor: '#000',
          placesColor: '#000',
          defaultFont: 'Roboto',
          roundedProfilePicture: true,
          hideInformationIcon: false,
          blockMargins: '1',
        },
      },
    ]

    try {
      await this.templateService.createMany([...dataPersian, ...dataEnglish])
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
