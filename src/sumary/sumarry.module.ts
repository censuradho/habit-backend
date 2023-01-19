import { Module } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { SummaryController } from './summary.controller'
import { SummaryService } from './summary.service'

@Module({
  controllers: [SummaryController],
  providers: [SummaryService, PrismaService],
})
export class SummaryModule {}
