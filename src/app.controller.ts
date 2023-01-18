import { Controller, Get } from '@nestjs/common'
import { PrismaService } from './database/prisma.service'

@Controller()
export class AppController {
  constructor(private readonly appService: PrismaService) {}

  @Get()
  getHello() {
    return { ok: true }
  }
}
