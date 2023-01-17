import { IsString, IsNumber } from 'class-validator'

export class CreateHabitDto {
  @IsString()
  title: string

  @IsNumber({}, { each: true })
  week_day: number
}
