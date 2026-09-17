import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivitiesExercisesService } from './activities_exercises.service';
import { ActivitiesExercisesController } from './activities_exercises.controller';
import { ActivitiesExercise } from './entities/activities_exercise.entity';

@Module({
    controllers: [ActivitiesExercisesController],
    providers: [ActivitiesExercisesService],
    imports: [TypeOrmModule.forFeature([ActivitiesExercise])],
    exports: [TypeOrmModule],
})
export class ActivitiesExercisesModule {}
