import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'

import { PlanService } from 'src/modules/plan/services/plan.service'

@Injectable()
export class MigrationPlanSeed {
  constructor(private readonly planService: PlanService) {}

  @Command({
    command: 'seed:plan',
    describe: 'seed plans',
  })
  async seeds(): Promise<void> {
    await this.planService.create({
      name: { en: 'Knowledge', fa: 'پلن دانش' },
      description: { en: 'This is Knowledge Plan', fa: 'این پلن دانش است' },
      price: 0,
      models: [],
      resumeAI: 1,
      generation: 10,
      resumeVoice: 1,
      isDefault: true,
      resumeCustom: 1,
      offForAnnual: true,
      slug: 'knowledge-plan',
      features: ['Support 24h', 'Upto 40+ use-cases'],
    })
    return
  }

  @Command({
    command: 'remove:plan',
    describe: 'remove plans',
  })
  async remove(): Promise<void> {
    try {
      await this.planService.deleteMany({})
    } catch (err: any) {
      throw new Error(err.message)
    }

    return
  }
}
