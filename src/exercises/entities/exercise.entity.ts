import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RoutinesExercise } from 'src/routines_exercises/entities/routines_exercise.entity';

@Entity('exercises')
export class Exercise {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true, nullable: false, length: 100 })
    name!: string;

    @Column({ nullable: false, type: 'text' })
    description!: string;

    @Column({ nullable: false, length: 50 })
    type!: string;

    @Column({ name: 'estimated_calories', type: 'decimal', precision: 10, scale: 2, nullable: false })
    estimatedCalories!: number;

    @Column({ name: 'estimated_distance_km', type: 'decimal', precision: 10, scale: 2, nullable: false })
    estimatedDistanceKm!: number;

    @Column({ name: 'estimated_duration_min', type: 'int', nullable: false })
    estimatedDurationMin!: number;

    @Column({ nullable: false, length: 255 })
    icon!: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @OneToMany(() => RoutinesExercise, (routineExercise) => routineExercise.exercise)
    routineExercises!: RoutinesExercise[];
}
