import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoutinesExercisesService } from './routines_exercises.service';
import { CreateRoutinesExerciseDto } from './dto/create-routines_exercise.dto';
import { UpdateRoutinesExerciseDto } from './dto/update-routines_exercise.dto';

@Controller('routines-exercises')
export class RoutinesExercisesController {
  constructor(private readonly routinesExercisesService: RoutinesExercisesService) {}

  @Post()
  create(@Body() createRoutinesExerciseDto: CreateRoutinesExerciseDto) {
    return this.routinesExercisesService.create(createRoutinesExerciseDto);
  }

  @Get()
  findAll() {
    return this.routinesExercisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routinesExercisesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoutinesExerciseDto: UpdateRoutinesExerciseDto) {
    return this.routinesExercisesService.update(+id, updateRoutinesExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routinesExercisesService.remove(+id);
  }
}
