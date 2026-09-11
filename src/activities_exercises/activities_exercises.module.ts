import { Module } from '@nestjs/common';
import { ActivitiesExercisesService } from './activities_exercises.service';
import { ActivitiesExercisesController } from './activities_exercises.controller';

@Module({
  controllers: [ActivitiesExercisesController],
  providers: [ActivitiesExercisesService],
})
export class ActivitiesExercisesModule {}
