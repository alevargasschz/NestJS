import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ActivityLog } from '../../activity_logs/entities/activity_log.entity';
import { RoutinesExercise } from '../../routines_exercises/entities/routines_exercise.entity';

@Entity('activities_exercises')
export class ActivitiesExercise {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'actual_sets', type: 'int', nullable: false })
    actualSets!: number;

    @Column({ name: 'actual_reps', type: 'int', nullable: false })
    actualReps!: number;

    @Column({ name: 'actual_weight_kg', type: 'decimal', precision: 10, scale: 2, nullable: false })
    actualWeightKg!: number;

    @Column({ name: 'actual_duration_min', type: 'int', nullable: false })
    actualDurationMin!: number;

    @Column({ name: 'calories_burned', type: 'decimal', precision: 10, scale: 2, nullable: false })
    caloriesBurned!: number;

    @Column({ name: 'distance_covered_km', type: 'decimal', precision: 10, scale: 2, nullable: false })
    distanceCoveredKm!: number;

    @Column({ name: 'started_at', type: 'timestamp', nullable: true })
    startedAt!: Date | null;

    @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
    completedAt!: Date | null;

    @ManyToOne(() => ActivityLog, (activityLog) => activityLog.activitiesExercises, { nullable: false })
    @JoinColumn({ name: 'activity_log_id' })
    activityLog!: ActivityLog;

    @ManyToOne(() => RoutinesExercise, (routineExercise) => routineExercise.activitiesExercises, { nullable: false })
    @JoinColumn({ name: 'routine_exercise_id' })
    routineExercise!: RoutinesExercise;
}
