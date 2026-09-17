import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ActivityLog } from '../../activity_logs/entities/activity_log.entity';
import { User } from '../../auth/entities/user.entity';
import { RoutinesExercise } from '../../routines_exercises/entities/routines_exercise.entity';

@Entity('routines')
export class Routine {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false, length: 100 })
    name!: string;

    @Column({ nullable: false, type: 'text' })
    description!: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt!: Date;

    @ManyToOne(() => User, (user) => user.routines, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @OneToMany(() => RoutinesExercise, (routineExercise) => routineExercise.routine)
    routineExercises!: RoutinesExercise[];

    @OneToMany(() => ActivityLog, (activityLog) => activityLog.routine)
    activityLogs!: ActivityLog[];
}
