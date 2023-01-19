import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  ValidationPipe,
  Param,
  Patch,
} from '@nestjs/common'

import { CreateHabitDto } from './dto/create-habit.dto'
import { DateQueryDto } from './dto/date-query.dto'

import { HabitService } from './habit.service'

@Controller('habits')
export class HabitController {
  constructor(private readonly service: HabitService) {}
  @Post()
  async create(@Body() body: CreateHabitDto) {
    await this.service.create(body)
  }

  @Get()
  async findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      })
    )
    query: DateQueryDto
  ) {
    return await this.service.findMany(query.date)
  }

  @Patch(':id/toggle')
  async toggle(@Param('id') id: string) {
    await this.service.toggleHabit(id)
  }
}
