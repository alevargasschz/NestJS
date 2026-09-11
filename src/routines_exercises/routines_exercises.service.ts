import { Injectable } from '@nestjs/common';
import { CreateRoutinesExerciseDto } from './dto/create-routines_exercise.dto';
import { UpdateRoutinesExerciseDto } from './dto/update-routines_exercise.dto';

@Injectable()
export class RoutinesExercisesService {
  create(createRoutinesExerciseDto: CreateRoutinesExerciseDto) {
    return 'This action adds a new routinesExercise';
  }

  findAll() {
    return `This action returns all routinesExercises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} routinesExercise`;
  }

  update(id: number, updateRoutinesExerciseDto: UpdateRoutinesExerciseDto) {
    return `This action updates a #${id} routinesExercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} routinesExercise`;
  }
}
