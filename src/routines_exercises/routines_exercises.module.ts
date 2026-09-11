import { Module } from '@nestjs/common';
import { RoutinesExercisesService } from './routines_exercises.service';
import { RoutinesExercisesController } from './routines_exercises.controller';

@Module({
  controllers: [RoutinesExercisesController],
  providers: [RoutinesExercisesService],
})
export class RoutinesExercisesModule {}
