import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivitiesExercisesService } from './activities_exercises.service';
import { CreateActivitiesExerciseDto } from './dto/create-activities_exercise.dto';
import { UpdateActivitiesExerciseDto } from './dto/update-activities_exercise.dto';

@Controller('activities-exercises')
export class ActivitiesExercisesController {
  constructor(private readonly activitiesExercisesService: ActivitiesExercisesService) {}

  @Post()
  create(@Body() createActivitiesExerciseDto: CreateActivitiesExerciseDto) {
    return this.activitiesExercisesService.create(createActivitiesExerciseDto);
  }

  @Get()
  findAll() {
    return this.activitiesExercisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesExercisesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivitiesExerciseDto: UpdateActivitiesExerciseDto) {
    return this.activitiesExercisesService.update(+id, updateActivitiesExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesExercisesService.remove(+id);
  }
}
