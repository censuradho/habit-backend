import { Controller, Post, Body } from '@nestjs/common'
import { CreateHabitDto } from './dto/habit/create.dto'

@Controller('habits')
export class HabitController {
  @Post()
  async create(@Body() body: CreateHabitDto) {}
}
