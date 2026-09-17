import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../auth/entities/user.entity';
import { ActivitiesExercise } from '../../activities_exercises/entities/activities_exercise.entity';
import { Routine } from '../../routines/entities/routine.entity';

@Entity('activity_logs')
export class ActivityLog {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'started_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    startedAt!: Date;

    @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
    completedAt!: Date | null;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @ManyToOne(() => User, (user) => user.activityLogs, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Routine, (routine) => routine.activityLogs, { nullable: false })
    @JoinColumn({ name: 'routine_id' })
    routine!: Routine;

    @OneToMany(() => ActivitiesExercise, (activitiesExercise) => activitiesExercise.activityLog)
    activitiesExercises!: ActivitiesExercise[];
}
