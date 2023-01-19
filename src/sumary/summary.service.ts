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
        ) as completed
      FROM days D
    `

    return summary
  }
}
