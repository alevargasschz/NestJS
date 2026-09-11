import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutinesExerciseDto } from './create-routines_exercise.dto';

export class UpdateRoutinesExerciseDto extends PartialType(CreateRoutinesExerciseDto) {}
