import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'

import Tones from '../data/tones.json'
import { ToneService } from 'src/modules/data/services/tone.service'

@Injectable()
export class MigrationToneSeed {
  constructor(private readonly toneService: ToneService) {}

  @Command({
    command: 'seed:tone',
    describe: 'seed tones',
  })
  async seeds(): Promise<void> {
    const tones = Tones.map(name => ({ name }))

    try {
      await this.toneService.createMany(tones)
    } catch (err: any) {
      throw new Error(err.message)
    }

    return
  }

  @Command({
    command: 'remove:tone',
    describe: 'remove tones',
  })
  async remove(): Promise<void> {
    try {
      await this.toneService.deleteMany({})
    } catch (err: any) {
      throw new Error(err.message)
    }

    return
  }
}
