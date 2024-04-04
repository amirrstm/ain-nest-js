import { join } from 'path'
import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'

import { JobsModule } from 'src/jobs/jobs.module'
import { RouterModule } from 'src/router/router.module'
import { CommonModule } from 'src/common/common.module'
import { AppController } from './controllers/app.controller'
import { AppMiddlewareModule } from 'src/app/middleware/app.middleware.module'

@Module({
  controllers: [AppController],
  providers: [],
  imports: [
    CommonModule,
    AppMiddlewareModule,
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', '..', 'public') }),

    // Jobs
    JobsModule.forRoot(),

    // Routes
    RouterModule.forRoot(),
  ],
})
export class AppModule {}
