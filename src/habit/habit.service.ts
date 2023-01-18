import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateHabitDto } from './dto/create-habit.dto'
import { startOfDay } from 'date-fns'

@Injectable()
export class HabitService {
  constructor(private readonly prisma: PrismaService) {}

  async create(habit: CreateHabitDto) {
    const { title, week_day } = habit

    await this.prisma.habit.create({
      data: {
        title,
        created_at: startOfDay(new Date()).toISOString(),
        week_day: {
          create: week_day.map((week_day) => ({
            week_day,
          })),
        },
      },
    })
  }
}
