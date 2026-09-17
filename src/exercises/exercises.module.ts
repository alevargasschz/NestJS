import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { Exercise } from './entities/exercise.entity';

@Module({
    controllers: [ExercisesController],
    providers: [ExercisesService],
    imports: [TypeOrmModule.forFeature([Exercise])],
    exports: [TypeOrmModule],
})
export class ExercisesModule {}
