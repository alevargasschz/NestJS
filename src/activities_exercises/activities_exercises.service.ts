import { Injectable } from '@nestjs/common';
import { CreateActivitiesExerciseDto } from './dto/create-activities_exercise.dto';
import { UpdateActivitiesExerciseDto } from './dto/update-activities_exercise.dto';

@Injectable()
export class ActivitiesExercisesService {
  create(createActivitiesExerciseDto: CreateActivitiesExerciseDto) {
    return 'This action adds a new activitiesExercise';
  }

  findAll() {
    return `This action returns all activitiesExercises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activitiesExercise`;
  }

  update(id: number, updateActivitiesExerciseDto: UpdateActivitiesExerciseDto) {
    return `This action updates a #${id} activitiesExercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} activitiesExercise`;
  }
}
