import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaService } from './database/prisma.service'
import { HabitModule } from './habit/habit.module'

@Module({
  imports: [HabitModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
