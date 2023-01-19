import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class SummaryService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany() {
    const summary = await this.prisma.$queryRaw`
      SELECT 
        D.id, 
        D.date, 
        (
          SELECT 
            cast(count(*) as float)
          FROM day_habit DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_day HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE
            HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
            AND H.created_at <= D.date
        ) as amount
      FROM days D
    `

    return summary
  }
}
