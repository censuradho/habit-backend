import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaService } from './database/prisma.service'
import { HabitModule } from './habit/habit.module'
import { SummaryModule } from './sumary/sumarry.module'

@Module({
  imports: [HabitModule, SummaryModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
