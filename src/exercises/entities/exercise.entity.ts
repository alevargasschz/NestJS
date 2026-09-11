import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exercises')
export class Exercise {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ unique: true, nullable: false, length: 50 })
    name!: string;
    @Column({ nullable: false, length: 255 })
    description!: string;
    @Column({ nullable: false, length: 50 })
    type!: string;
    @Column({ name: 'estimated_calories', type: 'float', nullable: false })
    estimatedCalories!: number;
    @Column({ name: 'estimated_distance_km', type: 'float', nullable: false })
    estimatedDistanceKm!: number;
    @Column({ name: 'estimated_duration_min', type: 'int', nullable: false })
    estimatedDurationMin!: number;
    @Column({ nullable: false, length: 255 })
    icon!: string;
    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    // routineExercises!: RoutineExercise[];
}
