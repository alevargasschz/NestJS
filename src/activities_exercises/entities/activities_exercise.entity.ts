import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';
import { RoutinesExercise } from 'src/routines_exercises/entities/routines_exercise.entity';

@Entity('activities_exercises')
export class ActivitiesExercise {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ name: 'actual_sets', type: 'int', nullable: false })
    actualSets!: number;
    actualReps!: number;
    actualWeightKg!: number;
    actualDurationMin!: number;
    caloriesBurned!: number;
    distanceCoveredKm!: number;
    startedAt!: Date;
    completedAt!: Date;

    activityLog!: ActivityLog;
    routineExercise!: RoutinesExercise;
}
