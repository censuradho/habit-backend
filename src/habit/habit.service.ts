import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateHabitDto } from './dto/create-habit.dto'
import { getDay, startOfDay } from 'date-fns'

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

  async findMany(date: string) {
    const parsedDay = startOfDay(new Date(date))
    const week_day = getDay(parsedDay)

    const possiblesHabits = await this.prisma.habit.findMany({
      where: {
        created_at: {
          lte: new Date(date),
        },
        week_day: {
          some: {
            week_day,
          },
        },
      },
    })

    const day = await this.prisma.day.findUnique({
      where: {
        date: new Date(parsedDay),
      },
      include: {
        day_habits: true,
      },
    })

    const completedHabits = day?.day_habits?.map(
      (dayHabit) => dayHabit.habit_id
    )

    return {
      possiblesHabits,
      completed_habits: completedHabits || [],
    }
  }
}
