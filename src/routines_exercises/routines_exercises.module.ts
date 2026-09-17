import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoutinesExercisesService } from './routines_exercises.service';
import { RoutinesExercisesController } from './routines_exercises.controller';
import { RoutinesExercise } from './entities/routines_exercise.entity';

@Module({
    controllers: [RoutinesExercisesController],
    providers: [RoutinesExercisesService],
    imports: [TypeOrmModule.forFeature([RoutinesExercise])],
    exports: [TypeOrmModule],
})
export class RoutinesExercisesModule {}
