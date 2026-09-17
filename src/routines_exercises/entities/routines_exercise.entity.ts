import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ActivitiesExercise } from '../../activities_exercises/entities/activities_exercise.entity';
import { Exercise } from '../../exercises/entities/exercise.entity';
import { Routine } from '../../routines/entities/routine.entity';

@Entity('routines_exercises')
export class RoutinesExercise {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'order_index', type: 'int', nullable: false })
    orderIndex!: number;

    @Column({ name: 'target_sets', type: 'int', nullable: false })
    targetSets!: number;

    @Column({ name: 'target_reps', type: 'int', nullable: false })
    targetReps!: number;

    @Column({ name: 'target_weight_kg', type: 'decimal', precision: 10, scale: 2, nullable: false })
    targetWeightKg!: number;

    @Column({ name: 'target_duration_min', type: 'int', nullable: false })
    targetDurationMin!: number;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @ManyToOne(() => Routine, (routine) => routine.routineExercises, { nullable: false })
    @JoinColumn({ name: 'routine_id' })
    routine!: Routine;

    @ManyToOne(() => Exercise, (exercise) => exercise.routineExercises, { nullable: false })
    @JoinColumn({ name: 'exercise_id' })
    exercise!: Exercise;

    @OneToMany(() => ActivitiesExercise, (activitiesExercise) => activitiesExercise.routineExercise)
    activitiesExercises!: ActivitiesExercise[];
}
