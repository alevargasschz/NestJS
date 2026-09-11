import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Routine } from 'src/routines/entities/routine.entity';

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
    @Column({ name: 'target_weight_kg', type: 'float', precision: 10, scale: 2, nullable: false })
    targetWeightKg!: number;
    @Column({ name: 'target_duration_min', type: 'int', nullable: false })
    targetDurationMin!: number;
    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    routine!: Routine;
    exercise!: Exercise;
}
