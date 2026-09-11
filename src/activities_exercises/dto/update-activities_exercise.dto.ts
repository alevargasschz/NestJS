import { PartialType } from '@nestjs/mapped-types';
import { CreateActivitiesExerciseDto } from './create-activities_exercise.dto';

export class UpdateActivitiesExerciseDto extends PartialType(CreateActivitiesExerciseDto) {}
